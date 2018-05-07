import React, {Component} from "react";
import EditMovieImage from "./EditMovieImage";
import EditMovieInfo from "./EditMovieInfo";
import "../styles/Editor.less"
import {getMovieBySlug} from "../reducers";
import {fetchActors, fetchMovieSlug} from '../actions/fetch';
import {connect} from "react-redux";
import block from '../helpers/BEM'
import {Redirect} from 'react-router'
import slugify from 'slugify';

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
            genre: '',
            format: [],
            technology: [],
            trailer: '',
            cast: []
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
            description,
            genre,
            format,
            technology,
            trailer,
            cast
        } = this.state;
        const {film} = this.props;
        const durationIsObject = (typeof duration === 'object');

        const movie = {
            name,
            cast: cast.map(c => c._id).filter(id => id.trim() !== ''),
            image: poster,
            rating: parseFloat(rating),
            description,
            screenshots,
            trailer,
            genre,
            format,
            technology,
            duration: (durationIsObject) ? duration : {
                "hour": parseInt(duration.split(':')[0]),
                "minute": parseInt(duration.split(':')[1])
            }
        };

        console.log("EDITED MOVIE", movie);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        cast
            .filter(el => el._id.trim() !== '')
            .map(el => {
                    const movies = (el.movies.includes(film._id)) ? [...el.movies] : [...el.movies, film._id];
                    fetch(`http://localhost:3000/actors/${el._id}`, {
                        method: 'PATCH',
                        headers: headers,
                        body: JSON.stringify({movies})
                    }).then((res) => res.json())
                });

        const result = await fetch(`http://localhost:3000/movies/${film._id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(movie)
        });
        console.log('res', result);
        if (!result.ok) {
            alert('Your form was not submitted!');
        }
        else {
            const resToJson = await result.json();
            console.log('result to json', resToJson);
            this.setState({fireRedirect: true})
        }

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
        console.log('here state', this.state);
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
        console.log('FILM', film);
        return {film};
    }, (dispatch) => ({
        fetchActorById: (id) => dispatch(fetchActors(id)),
        fetchMovieBySlug: (slug) => dispatch(fetchMovieSlug(slug))
})
)(EditMoviePage);