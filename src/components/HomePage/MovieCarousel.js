import React, {Component} from "react";
import "../../styles/MovieCarousel.less";
import MoviePoster from "./MoviePoster";

class MovieCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={"MovieCarousel"}>
            MovieCarousel
            <MoviePoster/>
        </div>;
    }
}

export default MovieCarousel;