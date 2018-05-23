import React, {Component} from "react";
import "../styles/EditInfo.less";
import block from '../helpers/BEM'
import {genres, formats, technologies} from "../helpers/constants";
import MultiSelection from "./MultiSelection";
import CalendarRangePicker from "./CalendarRangePicker";
import TimeRanges from "./TimeRanges";
import AddDynamicList from "./AddDynamicList";

const b = block("EditInfo");

class EditMovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: props.film.rating,
            duration: props.film.duration,
            scheduleTime: props.film.Schedule ? Array.from(new Set(props.film.Schedule.map(el => el.split(' ')[1]))).sort() : [],
            scheduleDate: props.film.Schedule ? Array.from(new Set(props.film.Schedule.map(el => el.split(' ')[0]))).sort() : [],
            name: props.film.name,
            description: props.film.description,
            genre: props.film.genre,
            format: props.film.format,
            technology: props.film.technology,
            actors: props.actors,
            label: props.film.label,
            startDate: props.film.startDate
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.callback = this.callback.bind(this);
    }

    componentDidMount() {
        const {label, startDate, rating, duration, name, description, scheduleTime, scheduleDate, genre, format, technology, actors} = this.state;
        const chosenGenres = genre ? ((typeof genre === 'object') ? genre : genre.split(', ')) : [];
        const chosenTechnologies = technology ? ((typeof technology === 'object') ? technology : technology.split(',')) : [];
        const chosenFormats = format ? ((typeof format === 'object') ? format : format.split(',')) : [];
        this.props.callback(
            ['label', 'startDate', 'rating', 'duration', 'name', 'description', 'scheduleTime', 'scheduleDate', 'genre', 'format', 'technology', 'cast'],
            [label, startDate, rating, duration, name, description, scheduleTime, scheduleDate, chosenGenres, chosenFormats, chosenTechnologies, actors]);
    }

    componentDidUpdate(prevProps, prevState) {
        const {label, rating, startDate, duration, name, description, scheduleTime, scheduleDate, genre, format, technology, actors} = this.state;
        const chosenGenres = genre ? ((typeof genre === 'object') ? genre : genre.split(', ')) : [];
        const chosenTechnologies = technology ? ((typeof technology === 'object') ? technology : technology.split(',')) : [];
        const chosenFormats = format ? ((typeof format === 'object') ? format : format.split(',')) : [];
        const stDate = startDate ? ((typeof startDate === 'object') ?
            startDate :
            {
                year: parseInt(startDate.split('-')[0]),
                month: parseInt(startDate.split('-')[1]),
                day: parseInt(startDate.split('-')[2])
            }) : {};

        if (prevState !== this.state) {
            this.props.callback(
                ['label', 'startDate', 'rating', 'duration', 'name', 'description', 'scheduleTime', 'scheduleDate', 'genre', 'format', 'technology', 'cast'],
                [label, stDate, rating, duration, name, description, scheduleTime, scheduleDate, chosenGenres, chosenFormats, chosenTechnologies, actors]);
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
        let hour = "";
        let minute = "";
        let durationTime = "";
        let chosenGenres = [];
        let chosenTechnologies = [];
        let chosenFormats = [];
        let schedule = "";
        let from = undefined;
        let to = undefined;
        if (film.duration) {
            hour = (film.duration.hour > 9 ? '' : '0') + film.duration.hour.toString();
            minute = (film.duration.minute > 9 ? '' : '0') + film.duration.minute.toString();
            durationTime = hour + ':' + minute;
        }
        if (film.genre || film.technology || film.format) {
            chosenGenres = (typeof film.genre === 'object') ? film.genre : film.genre.split(', ');
            chosenTechnologies = (typeof film.technology === 'object') ? film.technology : film.technology.split(',');
            chosenFormats = (typeof film.format === 'object') ? film.format : film.format.split(',');
        }
        if (film.Schedule) {
            schedule = film.Schedule;
            if (schedule.length !== 0) {
                const fromSch = schedule[0].split(' ')[0];
                const fromReverse = fromSch.split('-').reverse().join('-');

                const toSch = schedule[schedule.length - 1].split(' ')[0];
                const toReverse = toSch.split('-').reverse().join('-');

                from = fromReverse;
                to = toReverse;

                if (new Date(fromReverse).getTime() > new Date(toReverse).getTime()) {
                    from = toReverse;
                    to = fromReverse;
                }
            }
        }

        let timeRanges = [];
        if (schedule) {
            timeRanges = Array.from(new Set(schedule.map(el => el.split(' ')[1]))).sort();
        }

        return [durationTime, chosenGenres, chosenTechnologies, chosenFormats, from, to, timeRanges];
    }

    render() {
        const {film, actors} = this.props;
        const {label, startDate} = this.state;
        const values = this.getDataFromFilm(film);
        const durationTime = values[0];
        const chosenGenres = values[1];
        const chosenTechnologies = values[2];
        const chosenFormats = values[3];
        const from = values[4];
        const to = values[5];
        const timeRanges = values[6];
        let stDate = startDate;
        if (typeof startDate === 'object') {
            const year = startDate.year;
            const month = (startDate.month > 9 ? '' : 0) + startDate.month.toString();
            const day = (startDate.day > 9 ? '' : 0) + startDate.day.toString();
            stDate = year + '-' + month + '-' + day;
        }

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
                <input type="date" onChange={this.onValueChange} defaultValue={stDate} name='startDate'
                       className={b('input')}/>

                <h3 className={b('title')}>Schedule</h3>
                <CalendarRangePicker from={new Date(from)} to={new Date(to)} name='scheduleDate'
                                     startDate={stDate} callbackFromParent={this.callback}/>
                <TimeRanges name='scheduleTime' schedule={timeRanges} callbackFromParent={this.callback}/>

                <h3 className={b('title')}>Genre</h3>
                <MultiSelection options={genres} defaultValue={chosenGenres} name='genre'
                                callback={this.callback}/>

                <h3 className={b('title')}>Format</h3>
                <MultiSelection options={formats} defaultValue={chosenFormats} name='format'
                                callback={this.callback}/>

                <h3 className={b('title')}>Technology</h3>
                <MultiSelection options={technologies} defaultValue={chosenTechnologies} name='technology'
                                callback={this.callback}/>

                <h3 className={b('title')}>Actors</h3>
                <AddDynamicList type='actor' items={actors} callback={this.callback}/>

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
