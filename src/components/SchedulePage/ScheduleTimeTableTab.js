import React, {Component} from 'react';
import ScheduleTable from "./ScheduleTable";
import "../../styles/ScheduleTimeTableTab.less";


class ScheduleTimeTableTab extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="ScheduleTimeTableTab">
        Schedule Time Table Tab
        <ScheduleTable/>
      </div>
    )
  }
}

export default ScheduleTimeTableTab
