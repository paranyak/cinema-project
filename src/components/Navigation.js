import React, { Component } from "react"
import "../styles/Navigation.scss"
import block from "../helpers/BEM"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { logoutUser } from "../actions/auth"
import { getCurrentUser, getMoviesAutocomplete } from "../reducers/index"
import { withRouter } from "react-router-dom"
import { fetchAutocompleteMovies, clearMoviesAutocomplete } from "../actions/movies"
import Autosuggest from "react-autosuggest"

const b = block("Navigation")

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
    }
  }

  signOut() {
    this.props.logoutUser()
  }

  onChange(event, { newValue }) {
    this.setState({
      ...this.state,
      search: newValue,
    })
  };

  onSuggestionsFetchRequested({ value }) {
    this.props.fetchMoviesAutocomlete(value)
  };

  onSuggestionsClearRequested() {
    this.props.clearMoviesAutocomplete()
  };


  render() {
    let additional = ""
    let role = this.props.user && this.props.user.role

    const inputProps = {
      placeholder: "Type a movie name",
      value: this.state.search,
      onChange: this.onChange.bind(this),
    }

    const getSuggestionValue = suggestion => suggestion.name

    // Use your imagination to render suggestions.
    const renderSuggestion = suggestion => {
      const link = "/movie/" + suggestion.slugName
      return <NavLink to={link} className={b("option")} title={suggestion.name}>
        {suggestion.name}
      </NavLink>
    }

    if (role === "admin") {
      additional = (<div>
        <NavLink to='/add-movie' className={b("add")} activeClassName={b("add", ["active"])}>
          Add Movie
        </NavLink>

        <NavLink to='/add-actor' className={b("add")} activeClassName={b("add", ["active"])}>
          Add Actor
        </NavLink>
      </div>)
    }
    return <div className={b()}>
      <NavLink to="/" exact className={b("tab")} activeClassName={b("tab", ["active"])}>Home</NavLink>
      <NavLink to="/schedule" className={b("tab")} activeClassName={b("tab", ["active"])}>Schedule</NavLink>
      <NavLink to="/allactors" className={b("tab")} activeClassName={b("tab", ["active"])}>All actors</NavLink>
      <div className={b("search")}>
        <Autosuggest
          suggestions={this.props.moviesAutocomplete}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
      <NavLink to="/login" style={{ display: this.props.user ? "none" : "block" }} className={b("tab", ["login"])}
               activeClassName={b("tab", ["active"])}>Login</NavLink>
      <button className={b("tab", ["logout"])} onClick={() => this.signOut()}
              style={{ display: this.props.user ? "block" : "none" }}>Log out
      </button>
      {additional}
    </div>
  }
}

export default withRouter(connect(
  state => ({
      user: getCurrentUser(state),
      moviesAutocomplete: getMoviesAutocomplete(state),
    }),
      (dispatch) => ({
        logoutUser: () => dispatch(logoutUser()),
        fetchMoviesAutocomlete: (name) => dispatch(fetchAutocompleteMovies(name)),
        clearMoviesAutocomplete: () => dispatch(clearMoviesAutocomplete()),
      })
  )(Navigation))
