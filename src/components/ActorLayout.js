import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getCurrentUser, getMovieById, isMovieFetching} from "../reducers/index";
import {fetchActorsSlug, fetchMovie, fetchDeleteActor} from '../actions/fetch';
import "../styles/ActorLayout.less"
import block from "../helpers/BEM";
import {connect} from "react-redux";
import {getActorBySlug, isActorFetchingSlug} from "../reducers";
import {monthNames} from "../helpers/constants";

const b = block("ActorLayout");
const link = 'https://res.cloudinary.com/dtnnkdylh/image/upload/w_275,h_408,c_thumb,g_face/';

class ActorLayout extends Component {

    componentWillReceiveProps(nextProps) {
        const {fetchMovieById} = this.props;
        nextProps.moviesToLoad.forEach((el) => fetchMovieById(el))
    }

    componentWillMount() {
        const {actor, isActorLoading} = this.props;
        if ((!actor || actor.slugName === undefined) && !isActorLoading) {
            this.props.fetchActorBySlug(this.props.match.params.slug.toLowerCase());
        }
    }

    deleteActor(id) {
        this.props.deleteActor(id);
    }

    render() {
        window.scrollTo(0, 0);
        const {movies, actor} = this.props;
        if (!actor) {
            return null;
        }
        if (actor && actor.error) {
            return (
                <section className={b("error")}>
                    <img width="100%"
                         src="http://www.topdesignmag.com/wp-content/uploads/2012/06/1.-404-not-found-design.jpg"/>
                </section>
            );
        }
        let additional = '';
        let role = this.props.user && this.props.user.role;

        const month = monthNames[actor.date.month - 1];
        const {year, day} = actor.date;
        const birthDay = month + ' ' + day + ', ' + year;

        if (role === 'admin') {
            additional = (<div>
                <Link to={`/edit-actor/${actor.slugName}`}>
                    <span className={b('edit-icon')}></span>
                </Link>
                <span className={b('delete-icon')} onClick={() => this.deleteActor(actor._id)}></span>
            </div>)
        }
        return (
            <section className={b()}>
                {additional}
                <section className={b("general")}>
                    <h1 className={b("name")}>
                        {actor.name}
                    </h1>
                    <p className={b("info")}>{actor.info}</p>
                    <section className={b("extra")}>
                        <p className={b("born-date")}>
                            Born on
                            <span className={b("value")}>{birthDay}</span>
                        </p>
                        <p className={b("born-city")}>
                            Born in
                            <span className={b("value")}>{actor.city}</span>
                        </p>
                        <ul className={b("nominations")}>
                            Nominations
                            {actor.nominations.map((n, ind) =>
                                <li className={b("value")} key={ind} style={{marginRight: 0}}>{n}</li>
                            )}
                        </ul>
                        <section className={b("movies")}>
                            Films
                            {movies.filter((movie) => movie)
                                .map((movie, i) =>
                                    <Link className={b("movie-link")} to={`/movie/${movie.slugName}`} key={i}>
                                        <p className={b("in-movie")}>{movie.name}</p>
                                    </Link>)}
                        </section>
                    </section>
                </section>
                <img className={b("image")} src={link + actor.image}/>
            </section>
        );
    }
}


export default connect((state, props) => {
        let moviesToLoad = [];
        const slug = props.match.params.slug.toLowerCase();
        const actor = getActorBySlug(state, slug);
        const isActorLoading = isActorFetchingSlug(slug, state);
        const user = getCurrentUser(state);
        let movies = [];
        if (actor) {
            movies = actor.movies.map((id) => {
                let movie = getMovieById(state, id);
                if (!movie) {
                    moviesToLoad.push(id);
                }
                return movie;
            })
        }
        moviesToLoad = moviesToLoad.filter((id) => isMovieFetching(id, state) !== true);
        return {
            actor,
            user,
            movies,
            moviesToLoad,
            isActorLoading
        };
    }, (dispatch) => ({
        fetchActorBySlug: (slug) => dispatch(fetchActorsSlug(slug)),
        fetchMovieById: (id) => dispatch(fetchMovie(id)),
        deleteActor: (id) => dispatch(fetchDeleteActor(id))
    })
)(ActorLayout);
