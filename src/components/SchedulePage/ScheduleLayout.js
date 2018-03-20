import React, {Component} from 'react';
import Filter from "./Filter";
import Schedule from "./Schedule";
import "../../styles/ScheduleLayout.less";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import {getAllFilters} from "../../reducers";
import {changeDate} from "../../actions";


class ScheduleLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    if (props.match && props.match.params.day) {
      props.setDate(props.match.params.day);
    }
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
    setDate: (date) => dispatch(changeDate(date))
  }
};

export default connect((state) => {
    const filters = getAllFilters(state);
        return {day: filters};
    },mapDispatchToProps
)(ScheduleLayout);
