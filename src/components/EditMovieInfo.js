import React, {Component} from "react";
import "../styles/EditInfo.less";
import block from '../helpers/BEM'
import {genres, formats, technologies} from "../helpers/constants";
import EditActorsList from "./EditActorsList";
import EditSelections from "./EditSelections";
import CalendarRangePicker from "./CalendarRangePicker";
import TimeRanges from "./TimeRanges";

const b = block("EditInfo");

class EditMovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: props.film.rating,
            duration: props.film.duration,
            scheduleTime: Array.from(new Set(props.film.Schedule.map(el => el.split(' ')[1]))).sort(),
            scheduleDate: Array.from(new Set(props.film.Schedule.map(el => el.split(' ')[0]))).sort(),
            name: props.film.name,
            description: props.film.description,
            genre: props.film.genre,
            format: props.film.format,
            technology: props.film.technology,
            cast: props.film.cast,
            label: props.film.label,
            startDate: props.film.startDate
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.callback = this.callback.bind(this);
    }

    componentDidMount() {
        const {label, startDate, rating, duration, name, description, scheduleTime, scheduleDate, genre, format, technology, cast} = this.state;
        const chosenGenres = (typeof genre === 'object') ? genre : genre.split(', ');
        this.props.callback(
            ['label', 'startDate', 'rating', 'duration', 'name', 'description', 'scheduleTime', 'scheduleDate', 'genre', 'format', 'technology', 'cast'],
            [label, startDate, rating, duration, name, description, scheduleTime, scheduleDate, chosenGenres, format, technology, cast]);
    }

    componentDidUpdate(prevProps, prevState) {
        const {label, rating, startDate, duration, name, description, scheduleTime, scheduleDate, genre, format, technology, cast} = this.state;
        if (prevState !== this.state) {
            this.props.callback(
                ['label', 'startDate', 'rating', 'duration', 'name', 'description', 'scheduleTime', 'scheduleDate', 'genre', 'format', 'technology', 'cast'],
                [label, startDate, rating, duration, name, description, scheduleTime, scheduleDate, genre, format, technology, cast]);
        }
    }

    onValueChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    callback(name, value) {
        this.setState({[name]: value})
    }
    
    getDataFromFilm(film) {
        const hour = (film.duration.hour > 9 ? '' : '0') + film.duration.hour.toString();
        const minute = (film.duration.minute > 9 ? '' : '0') + film.duration.minute.toString();
        const durationTime = hour + ':' + minute;
        const chosenGenres = (typeof film.genre === 'object') ? film.genre : film.genre.split(', ');

        const schedule = film.Schedule;
        const fromSch = schedule[0].split(' ')[0];
        const fromReverse = fromSch.split('-').reverse().join('-');

        const toSch = schedule[schedule.length - 1].split(' ')[0];
        const toReverse = toSch.split('-').reverse().join('-');

        let from = fromReverse;
        let to = toReverse;

        if (new Date(fromReverse).getTime() > new Date(toReverse).getTime()) {
            from = toReverse;
            to = fromReverse;
        }
        const timeRanges = Array.from(new Set(schedule.map(el => el.split(' ')[1]))).sort();

        const year = film.startDate.year;
        const month = (film.startDate.month > 9 ? '' : 0) + film.startDate.month.toString();
        const day = (film.startDate.day > 9 ? '' : 0) + film.startDate.day.toString();
        const startDate = year + '-' + month + '-' + day;
        return [durationTime, chosenGenres, from, to, timeRanges, startDate];
        
    }

    render() {
        const {film} = this.props;
        const {label} = this.state;
        const values = this.getDataFromFilm(film);
        const durationTime = values[0];
        const chosenGenres = values[1];
        const from = values[2];
        const to = values[3];
        const timeRanges = values[4];
        const startDate = values[5];

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

                <h3 className={b('title')}>Start Date</h3>
                <input type="date" onChange={this.onValueChange} defaultValue={startDate} name='startDate' className={b('input')}/>

                <h3 className={b('title')}>Schedule</h3>
                <CalendarRangePicker from={new Date(from)} to={new Date(to)} name='scheduleDate'
                                     startDate={film.startDate} callbackFromParent={this.callback}/>
                <TimeRanges name='scheduleTime' schedule={timeRanges} callbackFromParent={this.callback}/>

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
                <EditActorsList film={film} callback={this.callback}/>

                <h3 className={b('title')}>Label</h3>
                <div>
                    <label className={b('radio-btn')}>
                        <input type="radio" onChange={this.onValueChange} name="label" value="popular"
                               checked={label === 'popular'}/>
                        Popular
                    </label>
                    <label className={b('radio-btn')}>
                        <input type="radio" onChange={this.onValueChange} name="label" value="soon"
                               checked={label === 'soon'}/>
                        Soon on the screens
                    </label>
                    <label className={b('radio-btn')}>
                        <input type="radio" onChange={this.onValueChange} name="label" value=""
                               checked={label === ''}/>
                        None of the above
                    </label>
                </div>
            </section>
        )
    }
}

export default EditMovieInfo;