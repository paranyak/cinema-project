import React, {Component} from 'react';
import SheduleTable from "./SheduleTable";
// import "../styles/movie-info.less";


class SheduleTimeTableTab extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="shedule-time-table-tab">
        Shedule Time Table Tab
        <SheduleTable/>
      </div>
    )
  }
}

export default SheduleTimeTableTab
