import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import Feedback from "./Feedback";
import "../../styles/MovieLayout.less"
import block from "../../helpers/BEM";
import {getById, getAllMovies} from "../../reducers";
import {connect} from "react-redux";

const b = block("MovieLayout");



class MovieLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {film} = this.props;
        if (!film) {
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
    const movie = getById(state, props.match.params.id);
    console.log("CONNECT in MOVIELAYOUT", movie);
    return {film: movie};
    }
)(MovieLayout);
