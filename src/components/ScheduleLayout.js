import React, {Component} from 'react';
import Filter from "./Filter";
import Schedule from "./Schedule";
import "../styles/ScheduleLayout.scss";
import {connect} from "react-redux";
import {getAllFilters} from "../reducers";
import {changeDate, setFilters} from "../actions/filter";
import {fetchMoviesSchedule} from "../actions/movies";
import {DateTime} from "luxon/src/datetime.js";
import  * as queryString from 'query-string';

class ScheduleLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.filters = {};

    this.setDay(props);
    this.prepareFilters(props.location);

    props.setDate(this.day.toFormat('yyyy-MM-dd'));
    props.setFilters(this.filters);
  }

  setDay(props) {
    this.day = DateTime.fromFormat(props.match.params.day || '', 'yyyy-MM-dd');

    if (this.day.invalid) {
      this.day = DateTime.local();
    }
  }

  prepareFilters(location) {
    let search = location.search;

    if (search) {
      let query = search.replace('?', '');
      this.filters = queryString.parse(query);
      let keys = Object.keys(this.filters);
      keys.forEach(key => {
        this.filters[key] = this.filters[key] ? this.filters[key].split(',') : [];
      });

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
    fetchMoviesBySchedule: (day) => dispatch(fetchMoviesSchedule(day)),
    setFilters: (params) => dispatch(setFilters(params))
  }
};

export default connect((state) => {
    const filters = getAllFilters(state);
        return {day: filters};
    }, mapDispatchToProps
)(ScheduleLayout);
