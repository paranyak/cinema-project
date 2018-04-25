import React, {Component} from "react";
import "../styles/Layout.less";
import "../styles/common.less";
import block from "../helpers/BEM";
import AddMovieLayout from './AddMovieLayout'
import Navigation from "./Navigation";
import ScheduleLayout from "./ScheduleLayout";
import HomeLayout from "./HomeLayout";
import MovieLayout from "./MovieLayout";
import {Switch, Route} from 'react-router-dom'
import {allMovies} from '../actions/index'
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import ActorLayout from "./ActorLayout";
import AddActor from './AddActor';
import Login from './Login';
import SignUp from './SignUp';
import {setUser} from '../actions/index';
import {userAdditionalInfo} from '../actions/auth';

import EditMoviePage from './EditMoviePage';

const b = block("Layout");

class Layout extends Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      firebase.auth().onAuthStateChanged((user) => {
        this.props.setUser(user);
        if(user) {
          this.props.userAdditionalInfo(user.uid)
        }
      });
    }

    render() {
      return (<div className={b()}>
          <Navigation/>
          <Switch>
              <Route exact path='/' component={HomeLayout}/>
              <Route path='/movie/:id' component={MovieLayout}/>
              <Route path='/schedule/:day?' component={ScheduleLayout}/>
              <Route path='/actor/:id' component={ActorLayout}/>
              <Route path='/add-movie' component={AddMovieLayout}/>
              <Route path='/add-actor' component={AddActor}/>
              <Route path='/edit-movie/:id' component={EditMoviePage}/>
              <Route path='/login' component={Login}/>
              <Route path='/signup' component={SignUp}/>
          </Switch>
      </div>)
    }
}

Layout = withRouter(connect(null,
  (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
    userAdditionalInfo: (id) => dispatch(userAdditionalInfo(id))
  })
)(Layout));


export default Layout;
