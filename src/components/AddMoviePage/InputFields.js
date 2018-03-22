import React, {Component} from "react";
import "../../styles/InputFields.less";
import block from '../../helpers/BEM'
import CheckBoxList from "./CheckBoxList";

const b = block("InputField");

const cloudinaryImage = 'https://res.cloudinary.com/demo/image/fetch/w_275,h_408/';

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
            }
        };
    }

    // ----------- SCREENSHOTS ----------------
    createScShotsList() {
        return this.state.screenshots.map((el, i) =>
            <div key={i}>
                <input className={b('input', ['dynamic'])} type='url' placeholder='image url'/>
                <input type='button' value='-' className={b('button', ['remove'])} onClick={this.removeScShot.bind(this, i)}/>
            </div>
        )
    }

    addScShot(e) {
        e.preventDefault();
        this.setState(prevState => ({screenshots: [...prevState.screenshots, '']}))
    }

    removeScShot(i) {
        let screenshots = [...this.state.screenshots];
        screenshots.splice(i, 1);
        this.setState({screenshots});
    }


    // ----------- ACTORS ----------------
    createActorsList() {
        return this.state.actors.map((el, i) =>
            <div key={i}>
                <input className={b('input', ['dynamic'])} type='url' placeholder='image url'/>
                <input type='button' value='-' className={b('button', ['remove'])} onClick={this.removeActor.bind(this, i)}/>
            </div>
        )
    }

    addActor(e) {
        e.preventDefault();
        this.setState(prevState => ({actors: [...prevState.actors, '']}))
    }

    removeActor(i) {
        let actors = [...this.state.actors];
        actors.splice(i, 1);
        this.setState({actors});
    }


    // ----------- SCHEDULE ----------------
    createScheduleList() {
        return this.state.schedule.map((el, i) =>
            <form key={i}>
                <input className={b('input', ['dynamic'])} onBlur={this.lostFocus.bind(this, i)} type='text' placeholder='DD-MM-YYYY hh:mm'
                       pattern='^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\d\d\d\d [012]{0,1}[0-9]:[0-6][0-9]$'
                />
                <input type='button' value='-' className={b('button', ['remove'])} onClick={this.removeSchedule.bind(this, i)}/>
            </form>
        )
    }

    lostFocus(i, e) {
        const {schedule} = this.state;
        this.setState({
            schedule:
                [
                    ...schedule.slice(0, i),
                    e.target.value,
                    ...schedule.slice(i + 1),

                ]
        })
    }

    addSchedule(e) {
        e.preventDefault();
        this.setState(prevState => ({schedule: [...prevState.schedule, '']}))
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
        e.preventDefault();
        const duration = this.refs.duration.value.split(':');
        const genre = this.state.multiSelections['genre'];
        const format = this.state.multiSelections['format'];
        const technology = this.state.multiSelections['technology'];
        const startDate = this.refs.startDate.value.split('-');

        const movie = {
            name: this.refs.title.value,    // +
            image: cloudinaryImage + this.refs.image.value,   // ++++
            rating: parseFloat(this.refs.rating.value),     // +
            cast: [],
            description: this.refs.description.value,   // +
            screenshots: [],
            trailer: this.refs.trailer.value,   // +++
            genre: genre.join(', '),    // +++
            Schedule: this.state.schedule,
            format,    // +++
            technology,    // +++
            duration: {     // +++
                "hour": parseInt(duration[0]),
                "minute": parseInt(duration[1])
            },
            label: '',
            startDate: {    // +++
                "year": parseInt(startDate[0]),
                "month": parseInt(startDate[1]),
                "day": parseInt(startDate[2])
            }
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(movie)
        }).then((res) => res.json());
        console.log('posting has finished');
    }

    render() {
        return <form className={b()} onSubmit={this.addMovieToDB.bind(this)}>
            <h4 className={b('title')}>Title</h4>
            <input ref='title' className={b('input')} placeholder={'Title'} type='text'/>

            <h4 className={b('title')}>Image</h4>
            <input ref='image' className={b('input')} placeholder={'Enter image url'} type='url'/>

            <h4 className={b('title')}>Description</h4>
            <input ref='description' className={b('input')} placeholder={'Description'} type='text'/>

            <h4 className={b('title')}>Trailer</h4>
            <input ref='trailer' className={b('input')} placeholder={'Enter video url'} type='url'/>

            <h4 className={b('title')}>Rating</h4>
            <input ref='rating' className={b('input')} placeholder={'Enter only number'} type='number' min='0' max='10' step='0.1'
                   name='rating'/>

            <h4 className={b('title')}>Duration</h4>
            <input ref='duration' className={b('input')} type="time"/>

            <h4 className={b('title')}>Start Date</h4>
            <input ref='startDate' className={b('input')} type="date" name='startDate'/>

            <h4 className={b('title')}>Screenshots</h4>
            <button className={b('button', ['add'])} onClick={this.addScShot.bind(this)}>+</button>
            {this.createScShotsList()}

            <h4 className={b('title')}>Actors</h4>
            <button className={b('button', ['add'])} onClick={this.addActor.bind(this)}>+</button>
            {this.createActorsList()}

            <h4 className={b('title')}>Schedule</h4>
            <button className={b('button', ['add'])} onClick={this.addSchedule.bind(this)}>+</button>
            {this.createScheduleList()}

            <CheckBoxList action={this.handleSelect.bind(this)} name={'genre'} array={genres}/>
            <CheckBoxList action={this.handleSelect.bind(this)} name={'format'} array={formats}/>
            <CheckBoxList action={this.handleSelect.bind(this)} name={'technology'} array={technologies}/>

            <button type='submit' className={b('button', ['submit'])}>Submit</button>
        </form>
    }

}

export default InputFields;