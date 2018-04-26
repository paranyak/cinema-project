import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import "../styles/MovieLayout.less"
import block from "../helpers/BEM";
import {getMovieById, getCurrentUser} from "../reducers";
import { fetchMovie } from '../actions/fetch';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';


const b = block("MovieLayout");


class MovieLayout extends Component {
    render() {
        window.scrollTo(0,0);
        const {film} = this.props;
        if (!film || film.id === undefined) {
          this.props.fetchMovieById(this.props.match.params.id);
          return null;
        }
        let additional = '';
        let role = this.props.user && this.props.user.role;
        if(role === 'admin') {
          additional = (    <Link to={`/edit-movie/${film.id}`}>
                              <span className={b('edit-icon')}></span>
                            </Link>)
          }
        return (
            <div>
                <div className={b()}>
                    {additional}
                    <MovieInfo film={film}/>
                    <MovieImage film={film}/>
                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
      const movie = getMovieById(state, props.match.params.id);
      const user = getCurrentUser(state);
      return {film: movie,
              user};
    }, (dispatch) => ({
      fetchMovieById: (id) => dispatch(fetchMovie(id))
    })
)(MovieLayout);
