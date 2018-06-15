import React, { Component } from "react"
import "../styles/HomeLayout.scss"
import MovieCarousel from "./MovieCarousel"
// import UnpublishedMovies from "./UnpublishedMovies";
import AllMovies from "./AllMovies"
import block from "../helpers/BEM"
import { connect } from "react-redux"
import { getCurrentUser, getUnpublishedMovies } from "../reducers"

const b = block("HomeLayout")

class HomeLayout extends Component {
  render() {
    // let role = this.props.user && this.props.user.role
    // let additional = ""
    // if (role === "admin") {
    //   additional = (
    //     <div>
    //       <h1 className={b("title")}>Unpublished</h1>
    //       <MovieCarousel label={"unpublished"} movie={true} />
    //     </div>
    //   )
    // }
    return (
      <div className={b()}>
        {/*{additional}*/}
        <h1 className={b("title")}>Popular</h1>
        <MovieCarousel label={"popular"} movie={true} />
        <h1 className={b("title")}>Soon on the screens</h1>
        <MovieCarousel label={"soon"} movie={true} />
        <h1 className={b("title")}>All movies</h1>
        <AllMovies />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const user = getCurrentUser(state)
  const unpublishedFilms = getUnpublishedMovies(state) || []
  return { user, unpublishedFilms }
}

export default connect(mapStateToProps, null)(HomeLayout)
