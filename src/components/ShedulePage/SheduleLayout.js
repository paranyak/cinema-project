import React, {Component} from 'react';
import SheduleFilters from "./SheduleFilters";
import SheduleMoviesTab from "./SheduleMoviesTab";
import SheduleTimeTableTab from "./SheduleTimeTableTab";
import Footer from "../Footer";
import Header from "../Header";


class SheduleLayout extends Component {
  constructor(props) {
    super(props);
      this.state = {}
  }
  render() {
    return (
      <div className = "shedule-layout">
        <Header/>
        <SheduleFilters/>
        <SheduleMoviesTab/>
        <SheduleTimeTableTab/>
        <Footer/>
      </div>
    )
  }
}

export default SheduleLayout
