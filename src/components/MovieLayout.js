import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import "../styles/MovieLayout.less"
import block from "../helpers/BEM";
import {getMovieById} from "../reducers";
import { fetchMovie } from '../actions/fetch';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';


const b = block("MovieLayout");



class MovieLayout extends Component {
    render() {
        const {film} = this.props;
        if (!film || film.id === undefined) {
          this.props.fetchMovieById(this.props.match.params.id);
          return null;
        }
        return (
            <div>
                <div className={b()}>
                    <Link to={`/edit-movie/${film.id}`}>
                        <span className={b('edit-icon')}></span>
                    </Link>
                    <MovieInfo film={film}/>
                    <MovieImage film={film}/>
                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
      const movie = getMovieById(state, props.match.params.id);
      return {film: movie};
    }, (dispatch) => ({
      fetchMovieById: (id) => dispatch(fetchMovie(id))
    })
)(MovieLayout);
