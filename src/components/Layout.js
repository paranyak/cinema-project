import React, {Component} from "react";
import "../styles/Layout.less";
import "../styles/common.less";
import block from "../helpers/BEM";
import Footer from "./Footer";
import Header from "./Header";
import ScheduleLayout from "./SchedulePage/ScheduleLayout";
import HomeLayout from "./HomePage/HomeLayout";
import MovieLayout from "./MoviePage/MovieLayout";
import {Switch, Route} from 'react-router-dom'

const b = block("Layout");

class Layout extends Component {
    constructor() {
        super();
        this.state = {
            movies: []
        }
    }

    componentWillMount() {
        fetch('http://localhost:3000/db')
            .then(results => {return results.json()})
            .then(data => this.setState({movies: data.movies}));
    }

    render() {
        const {movies} = this.state;
        return <div className={b()}>
            <Header/>
            <Switch>
                <Route exact path='/' render={() => <HomeLayout db={movies}/>}/>
                <Route path='/movie/:id' render={() => <MovieLayout db={movies}/>}/>
                <Route path='/schedule' render={() => <ScheduleLayout db={movies}/>}/>
            </Switch>
            <Footer/>
        </div>
    }
}

export default Layout;
