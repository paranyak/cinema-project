import React, {Component} from "react";
import "../../styles/MoviePoster.less";

class MoviePoster extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <span className={"MoviePoster"}>MoviePoster</span>;
    }
}

export default MoviePoster;