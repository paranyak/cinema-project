import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import Feedback from "./Feedback";
import "../../styles/MovieLayout.less"
import block from "../../helpers/BEM";
import {getMovieById} from "../../reducers";
import {fetchMovie} from '../../actions';
import {connect} from "react-redux";

const b = block("MovieLayout");



class MovieLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {film} = this.props;
        if (!film || !film.id) {
          this.props.fetchMovieById(this.props.match.params.id);
          return null;
        }
        return (
            <div>
                <div className={b()}>
                    <MovieInfo film={film}/>
                    <MovieImage film={film}/>
                    <Feedback id={film.id}/>
                </div>
            </div>
        )
    }
}



export default connect((state, props) => {
      const movie = getMovieById(state, props.match.params.id);
      return {film: movie};
    }, (dispatch) => ({
      fetchMovieById: (id) => fetchMovie(id)(dispatch)
    })
)(MovieLayout);
