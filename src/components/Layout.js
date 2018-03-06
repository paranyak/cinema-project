import React from "react";
import "../styles/Layout.less";
import "../styles/common.less";
import AllMovies from "./HomePage/AllMovies";
import MovieCarousel from "./HomePage/MovieCarousel";
import block from "../helpers/BEM";
import Schedule from "./SchedulePage/Schedule";
import Footer from "./Footer";
import Header from "./Header";
const b = block("Layout");

// import Schedule from "./Schedule";

const Layout = () => (
  <div className={b()}>
    <Header />
    <MovieCarousel />
    <Footer />
  </div>
);

export default Layout;
