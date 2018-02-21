import React, {Component} from 'react'
import Actors from "./Actors";

class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="movie-info">Movie Info
                <Actors/>
            </div>
        )
    }
}

export default MovieInfo