import React, {Component} from 'react';
import ScheduleFilters from "./ScheduleFilter";
import ScheduleMoviesTab from "./ScheduleMoviesTab";
import ScheduleTimeTableTab from "./ScheduleTimeTableTab";
import Footer from "../Footer";
import Header from "../Header";
import "../../styles/ScheduleLayout.less"


class ScheduleLayout extends Component {
  constructor(props) {
    super(props);
      this.state = {}
  }
  render() {
    return (
      <div className="ScheduleLayout">
        <Filter/>
        <Schedule/>
      </div>
    )
  }
}

export default ScheduleLayout
