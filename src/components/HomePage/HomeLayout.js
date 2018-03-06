import React from "react";
import "../../styles/HomeLayout.less";
import MovieCarousel from "./MovieCarousel";
import AllMovies from "./AllMovies";
import block from "../../helpers/BEM";

const b = block("HomeLayout");

const HomeLayout = () => (
    <div className={b()}>
        <MovieCarousel/>
        <AllMovies/>
    </div>

);

export default HomeLayout;