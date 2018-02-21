import React, {Component} from "react";
import "../../styles/all-movies.less";
import MoviePoster from "./MoviePoster";


class AllMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={"all-movies"}>AllMovies
            <MoviePoster/>
            <MoviePoster/>
            <MoviePoster/>
            <MoviePoster/>
            <MoviePoster/>
            <br/>
            <MoviePoster/>
            <MoviePoster/>
            <MoviePoster/>
            <MoviePoster/>
            <MoviePoster/>
            <br/>
            <MoviePoster/>
            <MoviePoster/>
            <MoviePoster/>
            <MoviePoster/>
            <MoviePoster/>
            <br/>
            <a className={"all-movies__more"} href={"#"}>View All</a>
        </div>;
    }
}

export default AllMovies;