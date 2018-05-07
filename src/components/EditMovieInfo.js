import React, {Component} from "react";
import "../styles/EditInfo.less";
import block from '../helpers/BEM'
import {genres, formats, technologies} from "../helpers/constants";
import EditActorsList from "./EditActorsList";
import EditSelections from "./EditSelections";

const b = block("EditInfo");

class EditMovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: props.film.rating,
            duration: props.film.duration,
            name: props.film.name,
            description: props.film.description,
            genre: props.film.genre,
            format: props.film.format,
            technology: props.film.technology,
            cast: props.film.cast
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.callback = this.callback.bind(this);
    }

    componentDidMount() {
        const {rating, duration, name, description, genre, format, technology, cast} = this.state;
        const chosenGenres = (typeof genre === 'object') ? genre : genre.split(', ');
        this.props.callback(
            ['rating', 'duration', 'name', 'description', 'genre', 'format', 'technology', 'cast'],
            [rating, duration, name, description, chosenGenres, format, technology, cast]);
    }

    componentDidUpdate(prevProps, prevState) {
        const {rating, duration, name, description, genre, format, technology, cast} = this.state;
        if (prevState !== this.state) {
            this.props.callback(
                ['rating', 'duration', 'name', 'description', 'genre', 'format', 'technology', 'cast'],
                [rating, duration, name, description, genre, format, technology, cast]);
        }
    }

    onValueChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    callback(name, value) {
        this.setState({[name]: value})
    }

    render() {
        const {film} = this.props;
        const hour = (film.duration.hour > 9 ? '' : '0') + film.duration.hour.toString();
        const minute = (film.duration.minute > 9 ? '' : '0') + film.duration.minute.toString();
        const durationTime = hour + ':' + minute;
        const chosenGenres = (typeof film.genre === 'object') ? film.genre : film.genre.split(', ');
        return (
            <section className={b()}>
                <h3 className={b('title')}>Movie Title</h3>
                <input className={b("input", ['name'])} name='name' defaultValue={film.name}
                       onChange={this.onValueChange} placeholder='Please, enter the movie title...'/>

                <h3 className={b('title')}>Description</h3>
                <textarea className={b('input', ['textarea'])} defaultValue={film.description}
                          placeholder='Please, enter the movie description...' name='description' rows="5"
                          onChange={this.onValueChange}/>

                <h3 className={b('title')}>Rating</h3>
                <input type='number' min='0' max='10' name='rating' className={b("input", ['rating'])}
                       step='0.1' defaultValue={film.rating} onChange={this.onValueChange}/>

                <h3 className={b('title')}>Duration</h3>
                <input name='duration' type='time' className={b("input", ['duration'])} defaultValue={durationTime}
                       onChange={this.onValueChange}/>

                <h3 className={b('title')}>Genre</h3>
                <EditSelections options={genres} defaultValue={chosenGenres} name='genre'
                                callback={this.callback}/>

                <h3 className={b('title')}>Format</h3>
                <EditSelections options={formats} defaultValue={film.format} name='format'
                                callback={this.callback}/>

                <h3 className={b('title')}>Technology</h3>
                <EditSelections options={technologies} defaultValue={film.technology} name='technology'
                                callback={this.callback}/>

                <h3 className={b('title')}>Actors</h3>
                <EditActorsList film={film} callback={this.callback} />
            </section>
        )
    }
}

export default EditMovieInfo;