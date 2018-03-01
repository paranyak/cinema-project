import React, {Component} from 'react'
import Actors from "./Actors";
import "../../styles/MovieInfo.less";

class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="MovieInfo">Movie Info
                <Actors/>
            </div>
        )
    }
}

export default MovieInfo
