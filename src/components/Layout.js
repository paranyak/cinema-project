import React, { Component } from "react"
import "../styles/Layout.scss"
import "../styles/common.scss"
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
import { compose, propOr } from "ramda"
import { lifecycle } from "recompose"

const b = block("Layout")

const PrivateRoute = ({ component: Component, role, ...rest }) => (
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

const Layout = ({ user }) => {
  let role = propOr("", "role", user)

  return (
    <div className={b()}>
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomeLayout} />
        <Route path="/movie/:slug" component={MovieLayout} />
        <Route path="/schedule/:day?" component={ScheduleLayout} />
        <Route path="/allactors" component={AllActors} />
        <Route path="/actor/:slug" component={ActorLayout} />
        <PrivateRoute role={role} path="/add-movie" component={AddMovieLayout} />
        <PrivateRoute role={role} path="/add-actor" component={AddActorLayout} />
        <PrivateRoute role={role} path="/edit-movie/:slug" component={EditMoviePage} />
        <PrivateRoute role={role} path="/edit-actor/:slug" component={EditActorPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  )
}

const enhance = compose(
  withRouter,

  connect(state => ({ user: getCurrentUser(state) }), {
    setUser,
    userAdditionalInfo,
  }),

  lifecycle({
    componentWillMount() {
      const { setUser, userAdditionalInfo } = this.props

      firebase.auth().onAuthStateChanged(user => {
        setUser(user)
        if (user) userAdditionalInfo(user.uid)
      })
    },
  }),
)

export default enhance(Layout)
