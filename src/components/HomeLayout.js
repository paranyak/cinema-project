import React from "react";
import "../styles/HomeLayout.less";
import MovieCarousel from "./MovieCarousel";
import AllMovies from "./AllMovies";
import block from "../helpers/BEM";

const b = block("HomeLayout");

const HomeLayout = () => (
    <div className={b()}>
        <h1 className={b('title')}>Popular</h1>
        <MovieCarousel label={"popular"}/>
        <h1 className={b('title')}>Soon on the screens</h1>
        <MovieCarousel label={"soon"}/>
        <h1 className={b('title')}>All movies</h1>
        <AllMovies/>
    </div>

);

export default HomeLayout;
