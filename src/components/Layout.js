import React, { Component } from "react"
import "../styles/Layout.less"
import "../styles/common.less"
import block from "../helpers/BEM"
import AddMovieLayout from "./AddMovieLayout"
import Navigation from "./Navigation"
import ScheduleLayout from "./ScheduleLayout"
import HomeLayout from "./HomeLayout"
import MovieLayout from "./MovieLayout"
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import ActorLayout from "./ActorLayout"
import Login from "./Login"
import SignUp from "./SignUp"
import { setUser } from "../actions/auth"
import { userAdditionalInfo } from "../actions/auth"
import AllActors from "./AllActors"
import { getCurrentUser } from "../reducers/index"

import EditMoviePage from "./EditMoviePage"
import EditActorPage from "./EditActorPage"
import AddActorLayout from "./AddActorLayout"

import firebase from "../api/auth"

const b = block("Layout")

class Layout extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user)
      if (user) {
        this.props.userAdditionalInfo(user.uid)
      }
    })
  }

  render() {
    let role = ""
    if (this.props.user) {
      role = this.props.user.role
    }
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          role === "admin" ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
          )
        }
      />
    )
    return (
      <div className={b()}>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomeLayout} />
          <Route path="/movie/:slug" component={MovieLayout} />
          <Route path="/schedule/:day?" component={ScheduleLayout} />
          <Route path="/allactors" component={AllActors} />
          <Route path="/actor/:slug" component={ActorLayout} />
          <PrivateRoute path="/add-movie" component={AddMovieLayout} />
          <PrivateRoute path="/add-actor" component={AddActorLayout} />
          <PrivateRoute path="/edit-movie/:slug" component={EditMoviePage} />
          <PrivateRoute path="/edit-actor/:slug" component={EditActorPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    )
  }
}

Layout = withRouter(
  connect(
    (state, props) => ({
      user: getCurrentUser(state),
    }),
    dispatch => ({
      setUser: user => dispatch(setUser(user)),
      userAdditionalInfo: id => dispatch(userAdditionalInfo(id)),
    }),
  )(Layout),
)

export default Layout
