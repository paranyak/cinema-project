import React, {Component} from "react";
import "../styles/InputFields.less";
import block from '../helpers/BEM'
import CheckBoxList from "./CheckBoxList";
import DragDropImage from './DragDropImage';
import axios from 'axios'

const b = block("InputField");

const genres = [
    'Mystery',
    'Thriller',
    'Action',
    'Comedy',
    'Crime',
    'Adventure',
    'Sci-Fi',
    'Drama',
    'Romance',
    'Biography',
    'History',
    'Family',
    'Fantasy'
];

const formats = [
    '2D',
    '3D',
    'DolbyDigital'
];

const technologies = [
    'IMAX',
    'Cinematech+',
    '4Dx'
];


class InputFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenshots: [],
            actors: [],
            schedule: [],
            multiSelections: {
                genre: [],
                format: [],
                technology: []
            },
            title: '',
            description: '',
            trailer: '',
            rating: '',
            duration: '',
            startDate: '',
            label: '',
            poster: ''
        };
        this.baseState = this.state;
        this.changeInput = this.changeInput.bind(this);
    }


    // ----------- SCHEDULE ----------------
    createScheduleList() {
        console.log("SCHEDULE IN CREATE:", this.state.schedule);
        return this.state.schedule.map((el, i) =>
            <form key={i}>
                <p className="par"><span className="date-hour">{this.state.schedule[i].slice(0, 2)}</span> : <span
                    className="date-minute">{this.state.schedule[i].slice(3, 5)}</span></p>
                <input className={b("schedule-hour")} type="range" min="0" max="23" step="1" onChange={(e) => {
                    document.querySelectorAll('.date-hour')[i].innerHTML = e.target.value
                }}/>

                <input className={b("schedule-minute")} type="range" min="0" max="59" step="1" onInput={(e) => {
                    document.querySelectorAll('.date-minute')[i].innerHTML = e.target.value
                }}/>

                <input type='button' value='-' className={b('button', ['remove'])}
                       onClick={this.removeSchedule.bind(this, i)}/>
                <input type='button' value='done' className={b('button', ['remove'])}
                       onClick={(e) => this.onDoneClick(e, i, document.querySelectorAll(".par")[i])}/>
            </form>
        )
    }

    onDoneClick(e, i, val) {
        const {schedule} = this.state;
        let hour = (val.querySelector(".date-hour").innerHTML < 10 && val.querySelector(".date-hour").innerHTML !== '00') ? '0' + val.querySelector(".date-hour").innerHTML : val.querySelector(".date-hour").innerHTML;
        let minute = (val.querySelector(".date-minute").innerHTML < 10 && val.querySelector(".date-minute").innerHTML !== '00') ? '0' + val.querySelector(".date-minute").innerHTML : val.querySelector(".date-minute").innerHTML;

        this.setState({
            schedule:
                [
                    ...schedule.slice(0, i),
                    hour + ":" + minute,
                    ...schedule.slice(i + 1),

                ]
        });

        console.log("SCHEDULE AFTER ADD:", this.state.schedule);
    }

    addSchedule(e) {
        e.preventDefault();
        this.setState(prevState => ({schedule: [...prevState.schedule, '00:00']}))
    }

    removeSchedule(i) {
        let schedule = [...this.state.schedule];
        this.setState({
            schedule: [
                ...schedule.slice(0, i),
                ...schedule.slice(i + 1)
            ]
        });
    }

    // ------------------------------------------------------

    handleSelect(e) {       // get data from check boxes
        const {multiSelections} = this.state;
        const name = e.target.name;
        const value = e.target.value;

        let arr = [];

        if (!multiSelections[name].includes(value)) {
            console.log('Нема ще', value);
            arr = [...multiSelections[name], value];
        }
        else {
            console.log('Вже є', value);
            const ind = multiSelections[name].indexOf(value);
            const deselect = [...multiSelections[name]];
            deselect.splice(ind, 1);
            arr = [...deselect];
        }


        if (name === 'genre') {
            this.setState({
                multiSelections: {
                    genre: arr,
                    format: multiSelections['format'],
                    technology: multiSelections['technology']
                }
            })
        }
        else if (name === 'format') {
            this.setState({
                multiSelections: {
                    genre: multiSelections['genre'],
                    format: arr,
                    technology: multiSelections['technology']
                }
            })
        }
        else if (name === 'technology') {
            this.setState({
                multiSelections: {
                    genre: multiSelections['genre'],
                    format: multiSelections['format'],
                    technology: arr
                }
            })
        }
    }

    addMovieToDB(e) {
        // e.preventDefault();
        const {
            screenshots,
            actors,
            schedule,
            title,
            description,
            trailer,
            rating,
            duration,
            startDate,
            label,
            poster
        } = this.state;
        const genre = this.state.multiSelections['genre'];
        const format = this.state.multiSelections['format'];
        const technology = this.state.multiSelections['technology'];

        const movie = {
            name: title,    // +
            image: poster,
            rating: parseFloat(rating),     // +
            cast: actors,
            description,   // +
            screenshots,
            trailer,   // +++
            genre: genre.join(', '),    // +++
            Schedule: schedule,
            format,    // +++
            technology,    // +++
            duration: {     // +++
                "hour": parseInt(duration.split(':')[0]),
                "minute": parseInt(duration.split(':')[1])
            },
            label,
            startDate: {    // +++
                "year": parseInt(startDate.split('-')[0]),
                "month": parseInt(startDate.split('-')[1]),
                "day": parseInt(startDate.split('-')[2])
            }
        };

        console.log("MOVIE", movie);

        // const headers = new Headers();
        // headers.append('Content-Type', 'application/json');

        // fetch('http://localhost:3000/movies', {
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify(movie)
        // }).then((res) => res.json());
        console.log('posting has finished');
        alert('Form is successfully submitted!');
        document.querySelector('.InputField').reset();
        this.setState(this.baseState);
    }

    myCallback(type, item) {
        if (type === 'screenshot') {
            this.setState({screenshots: [...this.state.screenshots, item]})
        }
        else if (type === 'actor') {
            this.setState({actors: [...this.state.actors, item]})
        }
        else if (type === 'poster') {
            this.setState({poster: item});
        }
    };

    changeInput(e) {
        const {name, value} = e.target;
        switch (name) {
            case 'title': return this.setState({title: value});
            case 'description': return this.setState({description: value});
            case 'trailer': return this.setState({trailer: value});
            case 'rating': return this.setState({rating: value});
            case 'duration': return this.setState({duration: value});
            case 'startDate': return this.setState({startDate: value});
            case 'label': return this.setState({label: value});
            default: return;
        }
    };

    render() {
        const {
            screenshots,
            actors,
            schedule,
            title,
            description,
            trailer,
            rating,
            duration,
            startDate,
            label,
            poster
        } = this.state;
        console.log('this state', this.state);
        // console.log('poster', poster);
        // console.log('screenshots', screenshots);
        // const {title, description, trailer, rating, duration, startDate} = this.refs;
        const isEnabled =
            title.length *
            description.length *
            trailer.length *
            rating.length *
            duration.length *
            startDate.length !== 0;


        return <form className={b()}>
            <h4 className={b('title')}>Title</h4>
            <input onChange={this.changeInput} name='title' className={b('input')} placeholder={'Title'} type='text'/>

            <h4 className={b('title')}>Poster</h4>
            <DragDropImage type='poster' callbackFromParent={this.myCallback.bind(this)}/>

            <h4 className={b('title')}>Description</h4>
            <input onChange={this.changeInput} name='description' className={b('input')} placeholder={'Description'} type='text'
                   required/>

            <h4 className={b('title')}>Trailer</h4>
            <input onChange={this.changeInput} name='trailer' className={b('input')} placeholder={'Enter video url'} type='url'
                   required/>

            <h4 className={b('title')}>Rating</h4>
            <input onChange={this.changeInput} name='rating' className={b('input')} placeholder={'Enter only number'} type='number'
                   min='0' max='10'
                   step='0.1'
                   required/>

            <h4 className={b('title')}>Duration</h4>
            <input onChange={this.changeInput} name='duration' className={b('input')} type="time" required/>

            <h4 className={b('title')}>Start Date</h4>
            <input onChange={this.changeInput} name='startDate' className={b('input')} type="date" required/>

            <h4 className={b('title')}>Screenshots</h4>
            <DragDropImage type='screenshot' callbackFromParent={this.myCallback.bind(this)}/>

            {/*<h4 className={b('title')}>Actors</h4>*/}
            {/*<DragDropImage type='actor' callbackFromParent={this.myCallback.bind(this)}/>*/}

            {/*<h4 className={b('title')}>Schedule</h4>*/}
            {/*<button className={b('button', ['add'])} onClick={this.addSchedule.bind(this)}>+</button>*/}
            {/*{this.createScheduleList()}*/}

            <CheckBoxList action={this.handleSelect.bind(this)} name={'genre'} array={genres}/>
            <CheckBoxList action={this.handleSelect.bind(this)} name={'format'} array={formats}/>
            <CheckBoxList action={this.handleSelect.bind(this)} name={'technology'} array={technologies}/>

            <button type='submit' disabled={!isEnabled} className={b('button', ['submit'])} onClick={this.addMovieToDB.bind(this)}>Submit
            </button>
        </form>
    }

}

export default InputFields;