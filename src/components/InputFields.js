import React, {Component} from "react";
import "../styles/InputFields.less";
import block from '../helpers/BEM'
import DragDropImage from './DragDropImage';
import CalendarRangePicker from './CalendarRangePicker';
import TimeRanges from "./TimeRanges";
import {Redirect} from 'react-router'
import CastInputs from "./CastInputs";
import {genres, formats, technologies} from "../helpers/constants";
import EditSelections from "./EditSelections";
import slugify from 'slugify';

const b = block("InputField");

class InputFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            screenshots: [],
            cast: [],
            scheduleTime: [],
            scheduleDate: [],
            genre: [],
            format: [],
            technology: [],
            title: '',
            description: '',
            trailer: '',
            rating: '',
            duration: '',
            startDate: '',
            label: '',
            poster: ''
        };
        this.changeInput = this.changeInput.bind(this);
        this.myCallback = this.myCallback.bind(this);
        this.myCallback2 = this.myCallback2.bind(this);
    }


    addMovieToDB() {
        const {
            screenshots, cast, scheduleTime, scheduleDate, title,
            description, genre, format, technology, trailer, rating,
            duration, startDate, label, poster
        } = this.state;
        let Schedule = [];
        scheduleDate.map(d => scheduleTime.map(t => Schedule.push(d + ' ' + t)));

        const movie = {
            name: title,
            image: poster,
            rating: parseFloat(rating),
            cast: [],       //cast.filter(el => el !== ''),
            description,
            screenshots,
            trailer,
            genre: genre.join(', '),
            Schedule,
            format: format.filter(f => f !== ''),
            technology: technology.filter(t => t !== ''),
            duration: {
                "hour": parseInt(duration.split(':')[0]),
                "minute": parseInt(duration.split(':')[1])
            },
            label,
            startDate: {
                "year": parseInt(startDate.split('-')[0]),
                "month": parseInt(startDate.split('-')[1]),
                "day": parseInt(startDate.split('-')[2])
            }
        };

        console.log("MOVIE", movie);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(movie)
        }).then((res) => res.json());

        alert('Form is successfully submitted!');
        this.setState({fireRedirect: true})
    }

    myCallback(name, item) {
        this.setState({[name]: [...this.state[name], item]})
    };

    myCallback2(name, item) {
        this.setState({[name]: item})
    }

    changeInput(e) {
        const {name, value} = e.target;
        this.setState({[name]: value})
    };

    render() {
        const {
            fireRedirect, title, description, trailer,
            rating, duration, startDate, label
        } = this.state;
        console.log('-----------------------');
        console.log('this state', this.state);

        const isEnabled =
            title.length *
            description.length *
            trailer.length *
            rating.length *
            duration.length *
            startDate.length !== 0;

        return <div>
            <form className={b()}>
                <h3 className={b('title')}>Title</h3>
                <input onChange={this.changeInput} name='title' className={b('input')} placeholder={'Title'}
                       type='text'/>

                <h3 className={b('title')}>Poster</h3>
                <DragDropImage value={''} name='poster' callbackFromParent={this.myCallback2}
                               callbackInRemove={this.myCallback2}/>

                <h3 className={b('title')}>Description</h3>
                <textarea onChange={this.changeInput} name='description' className={b('input', ['textarea'])}
                          placeholder={'Please, enter the movie description'} rows="5"/>

                <h3 className={b('title')}>Trailer</h3>
                <input type='url' onChange={this.changeInput} name='trailer' className={b('input')}
                       placeholder={'Enter video url'}/>

                <h3 className={b('title')}>Rating</h3>
                <input type='number' onChange={this.changeInput} name='rating' className={b('input')}
                       placeholder={'Enter number only'}
                       min='0' max='10'
                       step='0.1'/>

                <h3 className={b('title')}>Duration</h3>
                <input type="time" onChange={this.changeInput} name='duration' className={b('input')}/>

                <h3 className={b('title')}>Start Date</h3>
                <input type="date" onChange={this.changeInput} name='startDate' className={b('input')}/>

                <h3 className={b('title')}>Screenshots</h3>
                <DragDropImage value={''} name='screenshots' callbackFromParent={this.myCallback}
                               callbackInRemove={this.myCallback2}/>

                <h3 className={b('title')}>Cast</h3>
                <CastInputs name='cast' callback={this.myCallback2}/>

                <h3 className={b('title')}>Schedule</h3>
                <CalendarRangePicker name='scheduleDate' startDate={startDate} callbackFromParent={this.myCallback2}/>
                <TimeRanges name='scheduleTime' callbackFromParent={this.myCallback2}/>


                <h3 className={b('title')}>Genre</h3>
                <EditSelections options={genres} defaultValue={''} name='genre'
                                callback={this.myCallback2}/>

                <h3 className={b('title')}>Format</h3>
                <EditSelections options={formats} defaultValue={''} name='format'
                                callback={this.myCallback2}/>

                <h3 className={b('title')}>Technology</h3>
                <EditSelections options={technologies} defaultValue={''} name='technology'
                                callback={this.myCallback2}/>

                <h3 className={b('title')}>Label</h3>
                <div>
                    <label className={b('radio-btn')}>
                        <input type="radio"
                               onChange={this.changeInput}
                               name="label"
                               value="popular"
                               checked={label === 'popular'}
                        />
                        Popular
                    </label>
                    <label className={b('radio-btn')}>
                        <input type="radio"
                               onChange={this.changeInput}
                               name="label"
                               value="soon"
                               checked={label === 'soon'}
                        />
                        Soon on the screens
                    </label>
                    <label className={b('radio-btn')}>
                        <input type="radio"
                               onChange={this.changeInput}
                               name="label"
                               value=""
                               checked={label === ''}
                        />
                        None of the above
                    </label>
                </div>
                <button type='submit'
                        disabled={!isEnabled}
                        className={b('submit-button')}
                        onClick={this.addMovieToDB.bind(this)}
                >
                    Submit
                </button>
            </form>
            {fireRedirect && (<Redirect to={'/'}/>)}
        </div>
    }

}

export default InputFields;