import React, {Component} from 'react';
import SheduleFilters from "./SheduleFilters";
import SheduleMoviesTab from "./SheduleMoviesTab";
import SheduleTimeTableTab from "./SheduleTimeTableTab";



class SheduleLayout extends Component {
  constructor(props) {
    super(props);
      this.state = {}
  }
  render() {
    return (
      <div className = "shedule-layout">
        <SheduleFilters/>
        <SheduleMoviesTab/>
        <SheduleTimeTableTab/>
      </div>
    )
  }
}

export default SheduleLayout
