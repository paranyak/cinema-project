import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import Feedback from "./Feedback";
import Footer from "../Footer";
import Header from "../Header";
import "../../styles/MovieLayout.less"
import MoviePoster from "../HomePage/MoviePoster";
import block from "../../helpers/BEM";
import {getById} from "../../reducers";
import {connect} from "react-redux";


const b = block("MovieLayout");

//TODO: Change id
const id = 1;


class MovieLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        console.log("here3", this.props);
        const {film} = this.props;

        return (
            <div className="MovieLayout">
                <Header/>
                <MovieImage film={film}/>
                <MovieInfo film={film}/>
                <Feedback film={film}/>
                <Footer/>
            </div>
        )
    }
}


export default connect(state => {
        const movie = getById(state, id);
        console.log(movie);
        return {film: movie};
    }
)(MovieLayout);