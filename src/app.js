import React from "react";
import ReactDOM from "react-dom";
import "./styles/common.less"
import MovieLayout from "./components/MovieLayout";
import SheduleLayout from "./components/SheduleLayout";

ReactDOM.render(
  <div>
    <MovieLayout/>
    <SheduleLayout/>
  </div>,
  document.getElementById("root")
);
