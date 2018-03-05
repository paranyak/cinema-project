import React from "react";
import "../styles/Layout.less";
import "../styles/common.less";
import AllMovies from "./HomePage/AllMovies";
import MovieCarousel from "./HomePage/MovieCarousel";
import block from "../helpers/BEM";
const b = block("Layout");

// import Schedule from "./Schedule";

const Layout = () => (
  <div className={b()}>
    <MovieCarousel />
  </div>
);

export default Layout;
