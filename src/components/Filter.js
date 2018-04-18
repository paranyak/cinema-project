import React, {Component} from 'react';
import "../styles/Filter.less";
import block from "../helpers/BEM";
import {connect} from "react-redux";
import {addFilter, removeFilter} from "../actions/filter";
import {getAllFilters} from "../reducers"
import {replace} from 'react-router-redux';
import  * as queryString from 'query-string';


const b = block("Filter");


class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.availableGenres = ['Mystery', 'Thriller', 'Action', 'Comedy', 'Crime', 'Adventure', 'Sci-Fi', 'Drama', 'Romance', 'Biography', 'History', 'Family', 'Fantasy'];
    this.availableTechnologies = ['Cinetech+', 'IMAX'];
    this.availableFormats = ['2D', '3D'];
  }

  moveFiltersToLocation() {
    let filtersToAdd = {
      formats: this.props.filters.formats.join(','),
      genres: this.props.filters.genres.join(','),
      technologies: this.props.filters.technologies.join(',')
    };
    let location = this.props.location
    this.props.updateLocation({
      ...location,
      search: '?' + queryString.stringify(filtersToAdd)
    })
  }

  render() {
    const {onSwitchFilter, filters} = this.props;
    this.moveFiltersToLocation();
    return (
      <div className={b()}>
        <header className={b("header")}>Filters</header>
        <section className={b("group")} >
          <span className={b("name")}>Genres</span>
          {this.availableGenres.map((el, i) => (
            <label htmlFor={el} key={i} className={b("filter")}> {el}
              <input className={b("checkbox")} type="checkbox" id={el} value="genres" checked={filters.genres.includes(el)} onChange={onSwitchFilter}/>
              <span className={b("checkmark")}></span>
            </label>
          ))}
        </section>
        <section className={b("group")} >
          <span className={b("name")}>Technologies</span>
          {this.availableTechnologies.map((el, i) => (
            <label htmlFor={el} key={i} className={b("filter")}> {el}
              <input className={b("checkbox")} type="checkbox" value="technologies" id={el} onChange={onSwitchFilter}/>
              <span className={b("checkmark")}></span>
            </label>
          ))}
        </section>
        <section className={b("group")} >
          <span className={b("name")}>Format</span>
          {this.availableFormats.map((el, i) => (
            <label htmlFor={el} key={i} className={b("filter")}> {el}
              <input className={b("checkbox")} type="checkbox" value="formats" id={el} onChange={onSwitchFilter}/>
              <span className={b("checkmark")}></span>
            </label>
          ))}
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchFilter: (event) => {
          if (event.target.checked === true) {
            dispatch(addFilter(event.target.value,event.target.id));
          }
          if (event.target.checked === false) {
            dispatch(removeFilter(event.target.value,event.target.id));
          }
        },
        updateLocation: (params) => dispatch(replace(params))
    }
};

export default connect((state, ownProps) => ({
    filters: getAllFilters(state)
  }),
    mapDispatchToProps
)(Filter);
