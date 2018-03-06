import React from "react";
import "../styles/Layout.less";
import "../styles/common.less";
import block from "../helpers/BEM";
import Footer from "./Footer";
import Header from "./Header";
import ScheduleLayout from "./SchedulePage/ScheduleLayout";
import HomeLayout from "./HomePage/HomeLayout";
import MovieLayout from "./MoviePage/MovieLayout";
import { Switch, Route } from 'react-router-dom'
const b = block("Layout");

const Layout = () => (
  <div className={b()}>
    <Header />
    <Switch>
      <Route exact path='/' component={HomeLayout}/>
      <Route path='/movie/:id' component={MovieLayout}/>
      <Route path='/schedule' component={ScheduleLayout}/>
    </Switch>
    <Footer />
  </div>
);

export default Layout;
