import React, {Component} from "react";
import "../styles/HomeLayout.less";
import MovieCarousel from "./MovieCarousel";
// import UnpublishedMovies from "./UnpublishedMovies";
import AllMovies from "./AllMovies";
import block from "../helpers/BEM";

const b = block("HomeLayout");

class HomeLayout extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        return <div className={b()}>
            <h1 className={b('title')}>Unpublished</h1>
            <MovieCarousel label={"unpublished"} movie={true}/>
            <h1 className={b('title')}>Popular</h1>
            <MovieCarousel label={"popular"} movie={true}/>
            <h1 className={b('title')}>Soon on the screens</h1>
            <MovieCarousel label={"soon"}  movie={true}/>
            <h1 className={b('title')}>All movies</h1>
            <AllMovies/>
        </div>
    }

};

export default HomeLayout;
