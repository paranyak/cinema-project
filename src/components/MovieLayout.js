import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import "../styles/MovieLayout.less"
import block from "../helpers/BEM";
import {getCurrentUser, getMovieBySlug} from "../reducers";
import {fetchMovieSlug, fetchDeleteMovie} from '../actions/fetch';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';


const b = block("MovieLayout");


class MovieLayout extends Component {

    deleteMovie(id) {
        this.props.deleteMovie(id);
    }

    render() {
        window.scrollTo(0, 0);
        const {film} = this.props;
        if (!film || film.slugName === undefined) {
            this.props.fetchMovieBySlug(this.props.match.params.slug.toLowerCase());
            return null;
        }
        let additional = '';
        let role = this.props.user && this.props.user.role;
        if (role === 'admin') {
            additional = (<div>
                    <Link to={`/edit-movie/${film.slugName}`}>
                        <span className={b('edit-icon')}></span>
                    </Link>
                    <span className={b('delete-icon')} onClick={() => this.deleteMovie(film._id)}></span>
                </div>
            )
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
        const slug = props.match.params.slug.toLowerCase();
        const film = getMovieBySlug(state, slug);
        const user = getCurrentUser(state);
        return {film, user};
    }, (dispatch) => ({
        fetchMovieBySlug: (slug) => dispatch(fetchMovieSlug(slug)),
        deleteMovie: (id) => dispatch(fetchDeleteMovie(id))
    })
)(MovieLayout);
