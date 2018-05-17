import React, {Component} from "react";
import EditMovieImage from "./EditMovieImage";
import EditMovieInfo from "./EditMovieInfo";
import "../styles/Editor.less"
import {getActorBySlug, getMovieBySlug} from "../reducers";
import {editActorBySlug} from '../actions/actors';
import {editMovieBySlug, fetchMovieSlug} from '../actions/movies';
import {connect} from "react-redux";
import block from '../helpers/BEM'
import {Redirect} from 'react-router'

const b = block("Editor");

class EditMoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            poster: '',
            screenshots: [],
            rating: 0,
            duration: '',
            name: '',
            description: '',
            scheduleTime: [],
            scheduleDate: [],
            genre: '',
            format: [],
            technology: [],
            trailer: '',
            cast: [],
            oldCast: props.oldCast,
            startDate: {},
            label: ''
        };
        this.getStateFromChild = this.getStateFromChild.bind(this);
    }

    getStateFromChild(keys, values) {
        let requiredFields = [ "startDate", "duration", "name", "description",  "scheduleDate", "genre", "format", "technology", "trailer", "rating"];
        let canSubmit = true;
        for (let k = 0; k < keys.length; k++) {
            console.log(keys);
            this.setState({[keys[k]]: values[k]});
            if(requiredFields.includes(keys[k]) &&( values[k].length == 0 || Object.values(values[k]).includes(NaN) || values[k][0] === "")){
                canSubmit = false;
            }
        }
        let submitButton = document.querySelector(".Editor__btn_submit");
        submitButton.style.visibility = canSubmit ? 'initial' : 'hidden';
    }

    async editMovieInDB(e) {
        e.preventDefault();
        const {
            poster,
            screenshots,
            rating,
            duration,
            name,
            label,
            description,
            scheduleDate,
            startDate,
            genre,
            format,
            technology,
            trailer,
            cast,
            oldCast
        } = this.state;
        const {film} = this.props;
        const durationIsObject = (typeof duration === 'object');

        let Schedule = [];
        const scheduleTime = this.state.scheduleTime.sort();
        scheduleDate.map(d => scheduleTime.map(t => Schedule.push(d + ' ' + t)));

        const convRating = rating ? parseFloat(rating) : "-.-";

        let newCast = cast;

        if (cast.length !== 0 && typeof cast[0] === 'object') {
            newCast = cast.map(c => c.slugName).filter(slug => slug.trim() !== '');
            cast.filter(el => el.slugName.trim() !== '')
                .map(el => {
                    const movies = (el.movies.includes(film.slugName)) ? [...el.movies] : [...el.movies, film.slugName];
                    this.props.editActors({movies}, el.slugName);
                });
            oldCast.map(o => {
                const a = cast.filter(n => n.slugName === o.slugName);
                if (a.length === 0) {
                    // delete current movie from Actor with ID we don't use any more
                    const movies = o.movies.filter(el => el !== film.slugName);
                    this.props.editActors({movies}, o.slugName);
                }
            });
        }

        const movie = {
            name,
            cast: newCast,
            image: poster,
            rating: convRating,
            description,
            screenshots,
            trailer,
            Schedule,
            genre: Array.isArray(genre) ? genre.join(', ') : genre,
            format,
            label,
            technology,
            duration: (durationIsObject) ? duration : {
                "hour": parseInt(duration.split(':')[0]),
                "minute": parseInt(duration.split(':')[1])
            },
            startDate
        };

        console.log("EDITED MOVIE", movie);

        await this.props.editMovie(movie, film.slugName);
        this.setState({fireRedirect: true})

    }

    cancelEditing() {
        console.log('Editing is canceled!!!');
        this.setState({fireRedirect: true});
    }

    render() {
        const {film, oldCast} = this.props;
        const {fireRedirect} = this.state;
        if (!film || film.slugName === undefined) {
            this.props.fetchMovieBySlug(this.props.match.params.slug.toLowerCase());
            return null;
        }
        return (<div>
                <form className={b()}>
                    <h1 className={b('title')}>EDIT MOVIE</h1>
                    <EditMovieImage film={film} callback={this.getStateFromChild}/>
                    <EditMovieInfo film={film} actors={oldCast} callback={this.getStateFromChild}/>
                    <div className={b('btns')}>
                        <button type='submit' className={b('btn', ['submit'])}
                                onClick={this.editMovieInDB.bind(this)}>Save
                        </button>
                        <button type='button' className={b('btn', ['cancel'])}
                                onClick={this.cancelEditing.bind(this)}>Cancel
                        </button>
                    </div>
                </form>
                {fireRedirect && (<Redirect to={`/movie/${film.slugName}`}/>)}
            </div>
        )
    }
}


export default connect((state, props) => {
        const slug = props.match.params.slug.toLowerCase();
        const film = getMovieBySlug(slug, state);
        const actors = film.cast.map(actorSlug => getActorBySlug(actorSlug, state));
        return {film, oldCast: actors};
    },
    (dispatch) => ({
        fetchMovieBySlug: slug => dispatch(fetchMovieSlug(slug)),
        editActors: (actor, slug) => dispatch(editActorBySlug(slug, actor)),
        editMovie: (movie, slug) => dispatch(editMovieBySlug(slug, movie))
    })
)(EditMoviePage);