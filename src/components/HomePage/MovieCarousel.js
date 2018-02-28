import React, {Component} from "react";
import "../../styles/movie-carousel.less";
import MoviePoster from "./MoviePoster";

class MovieCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={"movie-carousel"}>
            MovieCarousel
            <MoviePoster/>
        </div>;
    }
}

export default MovieCarousel;