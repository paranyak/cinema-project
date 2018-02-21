import React, {Component} from "react";
import "../../styles/movie-poster.less";

class MoviePoster extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <span className={"movie-poster"}>MoviePoster</span>;
    }
}

export default MoviePoster;