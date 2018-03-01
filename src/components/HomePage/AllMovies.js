import React, {Component} from "react";
import "../../styles/AllMovies.less";
import MoviePoster from "./MoviePoster";


class AllMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={"AllMovies"}>AllMovies
            <MoviePoster/>
            <a className={"AllMovies__more"} href={"#"}>View All</a>
        </div>;
    }
}

export default AllMovies;