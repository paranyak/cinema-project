import React, {Component} from 'react'
import MovieLayoutImage from "./MovieLayoutImage";
import MovieLayoutInfo from "./MovieLayoutInfo";
import "../styles/MovieLayout.less"
import block from "../helpers/BEM";
import {getCurrentUser, getMovieBySlug} from "../reducers";
import {fetchMovieSlug, fetchDeleteMovie} from '../actions/movies';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';


const b = block("MovieLayout");


class MovieLayout extends Component {

    deleteMovie(slug) {
        this.props.deleteMovie(slug);
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
                    <span className={b('delete-icon')} onClick={() => this.deleteMovie(film.slugName)}></span>
                </div>
            )
        }
        return (
            <div>
                <div className={b()}>
                    {additional}
                    <MovieLayoutInfo film={film}/>
                    <MovieLayoutImage film={film}/>
                </div>
            </div>
        )
    }
}

export default connect((state, props) => {
        const slug = props.match.params.slug.toLowerCase();
        const film = getMovieBySlug(slug, state);
        const user = getCurrentUser(state);
        return {film, user};
    }, (dispatch) => ({
        fetchMovieBySlug: (slug) => dispatch(fetchMovieSlug(slug)),
        deleteMovie: (slug) => dispatch(fetchDeleteMovie(slug))
    })
)(MovieLayout);
