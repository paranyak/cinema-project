import React, {Component} from 'react';
import Filter from "./Filter";
import Schedule from "./Schedule";
import "../../styles/ScheduleLayout.less"


class ScheduleLayout extends Component {
  constructor(props) {
    super(props);
      this.state = {}
  }
  render() {
    return (
      <div className="ScheduleLayout">
        <Filter />
        <Schedule/>
      </div>
    )
  }
}

export default ScheduleLayout
