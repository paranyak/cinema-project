import React, {Component} from "react";
import EditMovieImage from "./EditMovieImage";
import EditMovieInfo from "./EditMovieInfo";
import "../styles/Editor.less"
import {getMovieBySlug} from "../reducers";
import {editActorById, editMovieById, fetchActors, fetchMovieSlug} from '../actions/fetch';
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
            startDate: {},
            label: ''
        };
        this.getStateFromChild = this.getStateFromChild.bind(this);
    }

    getStateFromChild(keys, values) {
        for (let k = 0; k < keys.length; k++) {
            this.setState({[keys[k]]: values[k]})
        }
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
            cast
        } = this.state;
        const {film} = this.props;
        const durationIsObject = (typeof duration === 'object');

        let Schedule = [];
        const scheduleTime = this.state.scheduleTime.sort();
        scheduleDate.map(d => scheduleTime.map(t => Schedule.push(d + ' ' + t)));

        let newCast = cast;

        if (cast.length !== 0 && typeof cast[0] === 'object') {
            newCast = cast.map(c => c._id).filter(id => id.trim() !== '');
            cast.filter(el => el._id.trim() !== '')
                .map(el => {
                    const movies = (el.movies.includes(film._id)) ? [...el.movies] : [...el.movies, film._id];
                    this.props.editActors({movies}, el._id);
                });
        }

        const movie = {
            name,
            cast: newCast,
            image: poster,
            rating: parseFloat(rating),
            description,
            screenshots,
            trailer,
            Schedule,
            genre: genre.join(', '),
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

        this.props.editMovie(movie, film._id);
        this.setState({fireRedirect: true})

    }

    cancelEditing() {
        console.log('Editing is canceled!!!');
        this.setState({fireRedirect: true});
    }

    render() {
        const {film} = this.props;
        const {fireRedirect} = this.state;
        if (!film || film.slugName === undefined) {
            this.props.fetchMovieBySlug(this.props.match.params.slug);
            return null;
        }
        console.log('STATE', this.state);
        return (<div>
                <form className={b()}>
                    <h1 className={b('title')}>EDIT MOVIE</h1>
                    <EditMovieImage film={film} callback={this.getStateFromChild}/>
                    <EditMovieInfo film={film} callback={this.getStateFromChild}/>
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
        const film = getMovieBySlug(state, props.match.params.slug);
        return {film};
    },
    (dispatch) => ({
        fetchMovieBySlug: slug => dispatch(fetchMovieSlug(slug)),
        fetchActorById: id => dispatch(fetchActors(id)),
        editMovie: (movie, id) => dispatch(editMovieById(id, movie)),
        editActors: (actor, id) => dispatch(editActorById(id, actor))
    })
)(EditMoviePage);