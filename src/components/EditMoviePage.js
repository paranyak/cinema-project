import React, {Component} from "react";
import EditMovieImage from "./EditMovieImage";
import EditMovieInfo from "./EditMovieInfo";
import "../styles/Editor.less"
import {getMovieById} from "../reducers";
import {fetchMovie} from '../actions/fetch';
import {connect} from "react-redux";
import block from '../helpers/BEM'
import {Redirect} from 'react-router'

const b = block("Editor");

class EditMoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            id: '',
            poster: '',
            screenshots: [],
            rating: 0,
            duration: '',
            name: '',
            description: '',
            genre: '',
            format: [],
            technology: [],
        };
        this.getStateFromChild = this.getStateFromChild.bind(this);
    }

    getStateFromChild(keys, values) {
        for (let k = 0; k < keys.length; k++) {
            this.setState({[keys[k]]: values[k]})
        }
    }

    editMovieInDB(e) {
        e.preventDefault();
        const {
            id,
            poster,
            screenshots,
            rating,
            duration,
            name,
            description,
            genre,
            format,
            technology
        } = this.state;
        const durationIsObject = (typeof duration === 'object');

        const movie = {
            name,
            image: poster,
            rating: parseFloat(rating),
            description,
            screenshots,
            genre: genre.join(', '),
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

        fetch(`http://localhost:3000/movies/${id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(movie)
        }).then((res) => res.json());

        alert('Form is successfully edited!');

        this.setState({fireRedirect: true});
    }

    cancelEditing() {
        console.log('Editing is canceled!!!');
        this.setState({fireRedirect: true});
    }

    render() {
        const {film} = this.props;
        const {fireRedirect} = this.state;
        console.log('STATE', this.state);
        if (!film || film.id === undefined) {
            this.props.fetchMovieById(this.props.match.params.id);
            return null;
        }
        return (<div>
                <form className={b()}>
                    <h1 className={b('title')}>EDIT MOVIE</h1>
                    <EditMovieImage film={film} callback={this.getStateFromChild}/>
                    <EditMovieInfo film={film} callback={this.getStateFromChild}/>
                    <button type='submit' className={b('btn', ['submit'])} onClick={this.editMovieInDB.bind(this)}>Save</button>
                    <button type='button' className={b('btn', ['cancel'])} onClick={this.cancelEditing.bind(this)}>Cancel</button>
                </form>
                {fireRedirect && (<Redirect to={`/movie/${film.id}`}/>)}
            </div>
        )
    }
}


export default connect((state, props) => {
        const movie = getMovieById(state, props.match.params.id);
        return {film: movie};
    }, (dispatch) => ({
        fetchMovieById: (id) => dispatch(fetchMovie(id))
    })
)(EditMoviePage);