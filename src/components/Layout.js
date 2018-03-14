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
import {setMovies} from '../actions/index'
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';

const b = block("Layout");

class Layout extends Component {
    constructor() {
        super();
        console.log('LAYOUT');
        this.state = {
            movies: []
        }
    }

    componentWillMount() {
        fetch('http://localhost:3000/db')
            .then(results => {return results.json()})
            .then(data => {
              this.setState({movies: data.movies})
              this.props.onSetMovies(data.movies)
            });
    }

    render() {
        const {movies} = this.state;
        return <div className={b()}>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomeLayout}/>
                <Route path='/movie/:id' component={MovieLayout}/>
                <Route path='/schedule' component={ScheduleLayout}/>
            </Switch>
            <Footer/>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetMovies: (movies) => {
          dispatch(setMovies(movies))
        }
    }
};

Layout = withRouter(connect(state =>
    () => ({}),
    mapDispatchToProps
)(Layout));


export default Layout;
