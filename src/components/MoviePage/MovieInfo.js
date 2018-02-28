import React, {Component} from 'react'
import Actors from "./Actors";
import "../../styles/movie-info.less";
import data from "../../data/data.js"


class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    jsonParsing() {
        console.log(data.Movies[0].cast);

    };

    render() {
        return (
            <div className="movie-info">Movie Info
                {this.jsonParsing()}
                <Actors/>
            </div>
        )
    }
}

export default MovieInfo
