import React, {Component} from "react";
import block from "../helpers/BEM";
import "../styles/AddMovieInfo.less";
import {formats, genres, technologies} from "../helpers/constants";
import EditSelections from "./EditSelections";
import CalendarRangePicker from "./CalendarRangePicker";
import TimeRanges from "./TimeRanges";
import AddDynamicList from "./AddDynamicList";

const b = block("AddMovieInfo");

class AddMovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: '',
            duration: '',
            name: '',
            description: '',
            genre: [],
            format: [],
            technology: [],
            actors: [],
            startDate: {},
            label: '',
            scheduleTime: [],
            scheduleDate: []
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.callback = this.callback.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const {rating, duration, name, description, genre, format, technology, actors, label, scheduleTime, scheduleDate, startDate} = this.state;
        if (prevState !== this.state) {
            this.props.callback(
                ['rating', 'duration', 'name', 'description', 'genre', 'format', 'technology', 'actors', 'label', 'scheduleTime', 'scheduleDate', 'startDate'],
                [rating, duration, name, description, genre, format, technology, actors, label, scheduleTime, scheduleDate, startDate]);
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
        const {label, startDate} = this.state;
        return (
            <section className={b()}>
                <h3 className={b('title')}>Movie Title</h3>
                <input className={b("input", ['name'])} name='name'
                       onChange={this.onValueChange} placeholder='Please, enter the movie title'/>

                <h3 className={b('title')}>Description</h3>
                <textarea className={b('input', ['textarea'])}
                          placeholder='Please, enter the movie description' name='description' rows="5"
                          onChange={this.onValueChange}/>

                <h3 className={b('title')}>Rating</h3>
                <input type='number' onChange={this.onValueChange} name='rating' className={b('input')}
                       placeholder={'Enter number only'}
                       min='0' max='10'
                       step='0.1'/>

                <h3 className={b('title')}>Duration</h3>
                <input name='duration' type='time' className={b("input")} onChange={this.onValueChange}/>

                <h3 className={b('title')}>Start Date</h3>
                <input type="date" onChange={this.onValueChange} name='startDate' className={b('input')}/>

                <h3 className={b('title')}>Schedule</h3>
                <CalendarRangePicker name='scheduleDate' from={undefined} to={undefined} startDate={startDate}
                                     callbackFromParent={this.callback}/>
                <TimeRanges name='scheduleTime' schedule={[]} callbackFromParent={this.callback}/>

                <h3 className={b('title')}>Genre</h3>
                <EditSelections options={genres} defaultValue={''} name='genre'
                                callback={this.callback}/>

                <h3 className={b('title')}>Format</h3>
                <EditSelections options={formats} defaultValue={''} name='format'
                                callback={this.callback}/>

                <h3 className={b('title')}>Technology</h3>
                <EditSelections options={technologies} defaultValue={''} name='technology'
                                callback={this.callback}/>

                <h3 className={b('title')}>Actors</h3>
                <AddDynamicList type='actor' callback={this.callback}/>

                <h3 className={b('title')}>Label</h3>
                <div>
                    <label className={b('radio-btn')}>
                        <input type="radio"
                               onChange={this.onValueChange}
                               name="label"
                               value="popular"
                               checked={label === 'popular'}
                        />
                        Popular
                    </label>
                    <label className={b('radio-btn')}>
                        <input type="radio"
                               onChange={this.onValueChange}
                               name="label"
                               value="soon"
                               checked={label === 'soon'}
                        />
                        Soon on the screens
                    </label>
                    <label className={b('radio-btn')}>
                        <input type="radio"
                               onChange={this.onValueChange}
                               name="label"
                               value=""
                               checked={label === ''}
                        />
                        None of the above
                    </label>
                </div>
            </section>
        )
    }
}

export default AddMovieInfo;