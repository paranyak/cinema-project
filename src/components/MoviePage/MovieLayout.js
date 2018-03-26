import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import "../../styles/MovieLayout.less"
import block from "../../helpers/BEM";
import {getSelectedMovie} from "../../reducers";
import {fetchMovie} from '../../actions';
import {connect} from "react-redux";


const b = block("MovieLayout");



class MovieLayout extends Component {
    constructor(props) {
        super(props);
        this.props.fetchMovieById(this.props.match.params.id);
    }


    render() {
        const {film} = this.props;
        if (film.id === undefined) {
          return null;
        }
        console.log("HERE ML");
        return (
            <div>
                <div className={b()}>
                    <MovieInfo film={film}/>
                    <MovieImage film={film}/>
                </div>
            </div>
        )
    }
}



export default connect((state, props) => {
    const movie = getSelectedMovie(state);
        return {film: movie};
    }, (dispatch) => ({
      fetchMovieById: (id) => fetchMovie(id)(dispatch)
    })
)(MovieLayout);
