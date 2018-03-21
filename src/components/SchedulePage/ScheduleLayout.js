import React, {Component} from 'react';
import Filter from "./Filter";
import Schedule from "./Schedule";
import "../../styles/ScheduleLayout.less";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import {getAllFilters, getAllMovies} from "../../reducers";
import {changeDate, fetchMoviesSchedule} from "../../actions";
import {DateTime} from "luxon/src/datetime.js";



class ScheduleLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.setDay(props);
    props.setDate(this.day.toFormat('yyyy-MM-dd'));
  }

  setDay(props) {
    this.day = DateTime.fromFormat(props.match.params.day || '', 'yyyy-MM-dd');

    if (this.day.invalid) {
      this.day = DateTime.local();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setDay(nextProps);
    this.props.fetchMoviesBySchedule(this.day.toFormat('dd-MM-yyyy'));
  }

  render() {
    const {day} = this.props;
    return (
      <div className="ScheduleLayout">
        <Filter/>
        <Schedule/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDate: (date) => dispatch(changeDate(date)),
    fetchMoviesBySchedule: (day) => fetchMoviesSchedule(day)(dispatch)
  }
};

export default connect((state) => {
    const filters = getAllFilters(state);
        return {day: filters};
    }, mapDispatchToProps
)(ScheduleLayout);
