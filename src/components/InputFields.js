import React, {Component} from "react";
import "../styles/InputFields.less";
import block from '../helpers/BEM'
import CheckBoxList from "./CheckBoxList";
import DragDropImage from './DragDropImage';
import CalendarRangePicker from './CalendarRangePicker';
import TimeRanges from "./TimeRanges";

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
            scheduleTime: [],
            scheduleDate: [],
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
            poster: []
        };

        this.baseState = this.state;
        this.changeInput = this.changeInput.bind(this);
        this.myCallback = this.myCallback.bind(this);
        this.myCallback2 = this.myCallback2.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

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

    addMovieToDB() {
        const {
            screenshots,
            actors,
            scheduleTime,
            scheduleDate,
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
        let Schedule = [];
        for (let i = 0; i < scheduleDate.length; i++) {
            for (let j = 0; j < scheduleTime.length; j++) {
                const item = scheduleDate[i] + ' ' + scheduleTime[j];
                Schedule.push(item)
            }
        }

        const movie = {
            name: title,    // +
            image: poster,
            rating: parseFloat(rating),     // +
            cast: actors,
            description,   // +
            screenshots,
            trailer,   // +++
            genre: genre.join(', '),    // +++
            Schedule,
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

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(movie)
        }).then((res) => res.json());

        console.log('posting has finished', movie);
        alert('Form is successfully submitted!');
        document.querySelector('.InputField').reset();
        this.setState(this.baseState);
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

    handleRadioButton(e) {

    }

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

        const isEnabled =
            title.length *
            description.length *
            trailer.length *
            rating.length *
            duration.length *
            startDate.length !== 0;


        return <form className={b()}>
            <h3 className={b('title')}>Title</h3>
            <input onChange={this.changeInput} name='title' className={b('input')} placeholder={'Title'} type='text'/>

            <h3 className={b('title')}>Poster</h3>
            <DragDropImage name='poster' callbackFromParent={this.myCallback2} callbackInRemove={this.myCallback2}/>

            <h3 className={b('title')}>Description</h3>
            <input type='text' onChange={this.changeInput} name='description' className={b('input')} placeholder={'Description'} />

            <h3 className={b('title')}>Trailer</h3>
            <input type='url' onChange={this.changeInput} name='trailer' className={b('input')} placeholder={'Enter video url'} />

            <h3 className={b('title')}>Rating</h3>
            <input type='number' onChange={this.changeInput} name='rating' className={b('input')} placeholder={'Enter number only'}
                   min='0' max='10'
                   step='0.1'/>

            <h3 className={b('title')}>Duration</h3>
            <input type="time" onChange={this.changeInput} name='duration' className={b('input')} />

            <h3 className={b('title')}>Start Date</h3>
            <input type="date" onChange={this.changeInput} name='startDate' className={b('input')} />

            <h3 className={b('title')}>Screenshots</h3>
            <DragDropImage name='screenshots' callbackFromParent={this.myCallback} callbackInRemove={this.myCallback2}/>

            <h3 className={b('title')}>Schedule</h3>
            <CalendarRangePicker name='scheduleDate' startDate={startDate} callbackFromParent={this.myCallback}/>
            <TimeRanges name='scheduleTime' callbackFromParent={this.myCallback2}/>

            <CheckBoxList action={this.handleSelect} name={'genre'} array={genres}/>
            <CheckBoxList action={this.handleSelect} name={'format'} array={formats}/>
            <CheckBoxList action={this.handleSelect} name={'technology'} array={technologies}/>

            {/*<form onChange={this.handleRadioButton.bind(this)}>*/}
                {/*<label><input type="radio" name="label" value="popular"/>Popular</label>*/}
                {/*<label><input type="radio" name="label" value="soon"/>Soon</label>*/}
                {/*<label><input type="radio" name="label" value="none"/>None of the above</label>*/}
            {/*</form>*/}
            <button type='submit'
                    disabled={!isEnabled}
                    className={b('button', ['submit'])}
                    onClick={this.addMovieToDB.bind(this)}
            >
                Submit
            </button>
        </form>
    }

}

export default InputFields;