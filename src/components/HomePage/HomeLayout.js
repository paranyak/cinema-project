import React from "react";
import "../../styles/HomeLayout.less";
import MovieCarousel from "./MovieCarousel";
import AllMovies from "./AllMovies";
import block from "../../helpers/BEM";

const b = block("HomeLayout");

const HomeLayout = ({db}) => (
    <div className={b()}>
        <h1 className={b('title')}>Popular</h1>
        <MovieCarousel label={"popular"} films={db}/>
        <h1 className={b('title')}>Soon on the screens</h1>
        <MovieCarousel label={"soon"} films={db}/>
        <h1 className={b('title')}>All movies</h1>
        <AllMovies films={db}/>
    </div>

);

export default HomeLayout;