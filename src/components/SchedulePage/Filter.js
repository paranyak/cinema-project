import React, {Component} from 'react';
import "../../styles/Filter.less";
import block from "../../helpers/BEM";
import {connect} from "react-redux";
import {addFilter, removeFilter} from "../../actions/filter";
import {getAllFilters} from "../../reducers"


const b = block("Filter");


class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.availableGenres = ['Mystery', 'Thriller', 'Action', 'Comedy', 'Crime', 'Adventure', 'Sci-Fi', 'Drama', 'Romance', 'Biography', 'History', 'Family', 'Fantasy'];
    this.availableTechnologies = ['Cinetech+', 'IMAX'];
    this.availableFormats = ['2D', '3D'];
  }

  render() {
    const {onSwitchFilter, filters} = this.props;
    return (
      <div className={b()}>
        <header className={b("header")}>Filters</header>
        <section className={b("group")} >
          <span className={b("name")}>Genres</span>
          {this.availableGenres.map((el, i) => (
            <section key={i} className={b("filter")}>
              <input type="checkbox" id={el} value="genres" checked={filters.genres.includes(el)} onChange={onSwitchFilter}/>
              <label htmlFor={el}>{el}</label>
            </section>
          ))}
        </section>
        <section className={b("group")} >
          <span className={b("name")}>Technologies</span>
          {this.availableTechnologies.map((el, i) => (
            <section key={i} className={b("filter")}>
              <input type="checkbox" value="technologies" id={el} onChange={onSwitchFilter}/>
              <label htmlFor={el}>{el}</label>
            </section>
          ))}
        </section>
        <section className={b("group")} >
          <span className={b("name")}>Format</span>
          {this.availableFormats.map((el, i) => (
            <section key={i} className={b("filter")}>
              <input type="checkbox" value="formats" id={el} onChange={onSwitchFilter}/>
              <label htmlFor={el}>{el}</label>
            </section>
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
        }
    }
};

export default connect(state => ({
    filters: getAllFilters(state)
  }),
    mapDispatchToProps
)(Filter);
