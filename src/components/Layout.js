import React from "react";
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

const b = block("Layout");

let Layout = () => (
    <div className={b()}>
        <Navigation/>
        <Switch>
            <Route exact path='/' component={HomeLayout}/>
            <Route path='/movie/:id' component={MovieLayout}/>
            <Route path='/schedule/:day?' component={ScheduleLayout}/>
            <Route path='/actor/:id' component={ActorLayout}/>
            <Route path='/add-movie' component={AddMovieLayout}/>
            <Route path='/add-actor' component={AddActor}/>

        </Switch>
    </div>
);

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

Layout = withRouter(connect(null,
    mapDispatchToProps
)(Layout));


export default Layout;
