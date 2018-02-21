import React from "react";
import ReactDOM from "react-dom";
import "./styles/common.less"
import MovieLayout from "./components/MoviePage/MovieLayout";
import HomeLayout from "./components/HomePage/HomeLayout";
import SheduleLayout from "./components/ShedulePage/SheduleLayout";

ReactDOM.render(
  <div>
    <h1>HOME PAGE</h1>
    <HomeLayout/>
    <h1>MOVIE PAGE</h1>
    <MovieLayout/>
    <h1>SHEDULE PAGE</h1>
    <SheduleLayout/>
  </div>,
  document.getElementById("root")
);
