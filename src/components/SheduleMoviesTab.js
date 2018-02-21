import React, {Component} from 'react';
import SheduleMovie from "./SheduleMovie";
// import "../styles/movie-info.less";


class SheduleMoviesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="shedule-movies-tab">
        Shedule Movies Tab
        <SheduleMovie/>
      </div>
    )
  }
}

export default SheduleMoviesTab
