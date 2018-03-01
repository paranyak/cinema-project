import React, {Component} from 'react';
import ScheduleMovie from "./ScheduleMovie";
import "../../styles/ScheduleMoviesTab.less";


class ScheduleMoviesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="ScheduleMoviesTab">
        Schedule Movies Tab
        <ScheduleMovie/>
      </div>
    )
  }
}

export default ScheduleMoviesTab
