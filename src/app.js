import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import moviesApp from './reducers';
import "./styles/common.less"
import MovieLayout from "./components/MoviePage/MovieLayout";
import HomeLayout from "./components/HomePage/HomeLayout";
import SheduleLayout from "./components/ShedulePage/SheduleLayout";

let store = createStore(moviesApp);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <h1>HOME PAGE</h1>
      <HomeLayout />
      <h1>MOVIE PAGE</h1>
      <MovieLayout />
      <h1>SCHEDULE PAGE</h1>
      <SheduleLayout />
    </div>
  </Provider>,
  document.getElementById("root")
);
