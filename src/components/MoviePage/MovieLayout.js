import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import Feedback from "./Feedback";
import Footer from "../Footer";
import Header from "../Header";


class MovieLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className = "movie-layout">
                <Header/>
                <MovieImage/>
                <MovieInfo/>
                <Feedback/>
                <Footer/>
            </div>
        )
    }
}

export default MovieLayout
