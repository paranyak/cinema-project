import React, {Component} from "react";
import "../styles/EditMovieInfo.less";
import block from '../helpers/BEM'
import {genres, formats, technologies} from "../helpers/filterConstants";
import EditActorsList from "./EditActorsList";
import EditSelections from "./EditSelections";

const b = block("EditMovieInfo");

class EditMovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.film.id,
            rating: props.film.rating,
            duration: props.film.duration,
            name: props.film.name,
            description: props.film.description,
            genre: props.film.genre,
            format: props.film.format,
            technology: props.film.technology,
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);
    }

    componentDidMount() {
        const {id, rating, duration, name, description, genre, format, technology} = this.state;
        this.props.callback(
            ['id', 'rating', 'duration', 'name', 'description', 'genre', 'format', 'technology'],
            [id, rating, duration, name, description, genre.split(', '), format, technology]);
    }

    componentDidUpdate(prevProps, prevState) {
        const {id, rating, duration, name, description, genre, format, technology} = this.state;
        if (prevState !== this.state) {
            this.props.callback(
                ['id', 'rating', 'duration', 'name', 'description', 'genre', 'format', 'technology'],
                [id, rating, duration, name, description, genre.split(', '), format, technology]);
        }
    }

    onValueChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    onSelectionChange(name, value) {
        this.setState({[name]: value})
    }

    render() {
        const {film} = this.props;
        const hour = (film.duration.hour > 9 ? '' : '0') + film.duration.hour.toString();
        const minute = (film.duration.minute > 9 ? '' : '0') + film.duration.minute.toString();
        const durationTime = hour + ':' + minute;
        const chosenGenres = film.genre.split(', ');
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
                                callback={this.onSelectionChange}/>

                <h3 className={b('title')}>Format</h3>
                <EditSelections options={formats} defaultValue={film.format} name='format'
                                callback={this.onSelectionChange}/>

                <h3 className={b('title')}>Technology</h3>
                <EditSelections options={technologies} defaultValue={film.technology} name='technology'
                                callback={this.onSelectionChange}/>

                <h3 className={b('title')}>Actors</h3>
                <EditActorsList film={film}/>
            </section>
        )
    }
}

export default EditMovieInfo;