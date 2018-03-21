import React, {Component} from "react";
import "../styles/Layout.less";
import "../styles/common.less";
import block from "../helpers/BEM";
import AddMovieLayout from './AddMoviePage/AddMovieLayout'
import Header from "./Header";
import ScheduleLayout from "./SchedulePage/ScheduleLayout";
import HomeLayout from "./HomePage/HomeLayout";
import MovieLayout from "./MoviePage/MovieLayout";
import {Switch, Route} from 'react-router-dom'
import {allMovies} from '../actions/index'
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import ActorLayout from "./ActorPage/ActorLayout";

const b = block("Layout");

class Layout extends Component {
    constructor() {
        super();
        console.log('LAYOUT');
        this.state = {
            movies: []
        }
    }
    //
    // componentWillMount() {
    //     fetch('http://localhost:3000/db')
    //         .then(results => {return results.json()})
    //         .then(data => {
    //             this.props.onSetMovies(data.movies)
    //         });
    // }

    render() {
        const {movies} = this.state;
        return <div className={b()}>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomeLayout}/>
                <Route path='/movie/:id' component={MovieLayout}/>
                <Route path='/schedule/:day?' component={ScheduleLayout}/>
                <Route path='/actor/:id' component={ActorLayout}/>
                <Route path='/add-movie' component={AddMovieLayout}/>
            </Switch>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetMovies: (movies) => {
            dispatch(allMovies(movies))
        }
    }
};

Layout = withRouter(connect(null,
    mapDispatchToProps
)(Layout));


export default Layout;
