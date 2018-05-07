import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import "../styles/MovieLayout.less"
import block from "../helpers/BEM";
import {getCurrentUser, getMovieBySlug} from "../reducers";
import {fetchMovieSlug} from '../actions/fetch';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';


const b = block("MovieLayout");


class MovieLayout extends Component {
    render() {
        window.scrollTo(0, 0);
        const {film} = this.props;
        if (!film || film.slugName === undefined) {
            this.props.fetchMovieBySlug(this.props.match.params.slug);
            return null;
        }
        let additional = '';
        let role = this.props.user && this.props.user.role;
        if (role === 'admin') {
            additional = (<Link to={`/edit-movie/${film.slugName}`}>
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
        const film = getMovieBySlug(state, props.match.params.slug);
        const user = getCurrentUser(state);
        return {film, user};
    }, (dispatch) => ({fetchMovieBySlug: (slug) => dispatch(fetchMovieSlug(slug))})
)(MovieLayout);
