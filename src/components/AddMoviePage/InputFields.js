import React, {Component} from "react";
import "../../styles/InputFields.less";
import block from '../../helpers/BEM'
import CheckBoxList from "./CheckBoxList";

const b = block("InputField");

const cloudinaryImage = 'https://res.cloudinary.com/demo/image/fetch/w_275,h_408/';
const cloudinaryScreenshot = 'https://res.cloudinary.com/demo/image/fetch/w_600/';
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
        this.screenshotID = 0;
    }

    // ----------- SCREENSHOTS ----------------
    createScShotsList() {
        return this.state.screenshots.map((el, i) => {
                console.log('element', el);
                return <div key={i}>
                    <input className={b('input', ['dynamic'])}
                           type='url'
                           placeholder={'Image url' + el.removeID.toString()}
                           onChange={this.scrOnChange.bind(this, el, i)}
                           required
                    />
                    <input type='button'
                           value='-'
                           className={b('button', ['remove'])}
                           onClick={this.removeScShot.bind(this, el)}/>
                </div>
            }
        )
    }


    scrOnChange(el, i, e) {
        const copy = this.state.screenshots;
        const obj = {
            'screenshot': e.target.value,
            'removeID': el.removeID
        };

        this.setState({
            screenshots:
                [
                    ...copy.slice(0, i),
                    obj,
                    ...copy.slice(i + 1)
                ]
        })
    }

    addScShot(e) {
        e.preventDefault();
        const obj = {
            'screenshot': "",
            'removeID': this.screenshotID++
        };
        this.setState(prevState => ({
            screenshots:
                [...prevState.screenshots, obj]
        }))
    }

    removeScShot(el) {
        const copy = this.state.screenshots.filter(elm => elm.removeID !== el.removeID);
        this.setState({screenshots: copy});
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
                <p className="par"><span className="date-hour">00</span> : <span className="date-minute">00</span></p>
                <input className={b("schedule-hour")} type="range" min="0" max="23" step="1" onChange={(e) => {console.log(e.target.value); document.querySelectorAll('.date-hour')[i].innerHTML = e.target.value}}/>

                <input className={b("schedule-minute")} type="range"  min="0" max="59" step="1" onInput={(e) => {console.log(e.target.value); document.querySelectorAll('.date-minute')[i].innerHTML = e.target.value}}/>

                <input type='button' value='-' className={b('button', ['remove'])} onClick={this.removeSchedule.bind(this, i)}/>
                <input type='button' value='done' className={b('button', ['remove'])} onClick={(e) => this.lostFocus(e, i, document.querySelectorAll(".par")[i])}/>
            </form>
        )
    }

    lostFocus( e, i,  val) {
        console.log("LOST FOCUS:", e, i, val.querySelector(".date-hour").innerHTML,":",  val.querySelector(".date-minute").innerHTML);
        const {schedule} = this.state;
        this.setState({
            schedule:
                [
                    ...schedule.slice(0, i),
                    val.querySelector(".date-hour").innerHTML +":"+  val.querySelector(".date-minute").innerHTML,
                    ...schedule.slice(i + 1),

                ]
        });

        console.log(this.state.schedule);
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
        const {screenshots} = this.state;
        console.log('screenshots', screenshots);
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