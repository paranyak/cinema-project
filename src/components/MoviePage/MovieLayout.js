import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import Feedback from "./Feedback";


class MovieLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className = "movie-layout">
                <MovieImage/>
                <MovieInfo/>
                <Feedback/>
            </div>
        )
    }
}

export default MovieLayout