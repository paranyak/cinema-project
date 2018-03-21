import React, {Component} from "react";
import "../../styles/AddMovieLayout.less";
import block from '../../helpers/BEM';
import InputField from "./InputField";

const b = block("AddMovieLayout");


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


class AddMovieLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenshots: [],
            actors: [],
            multiSelections: {
                genre: [],
                format: [],
                technology: []
            }
        };
    }

    createList() {
        return this.state.screenshots.map((el, i) =>
            <div key={i}>
                <input type='url' placeholder='image url'/>
                <input type='button' value='-' onClick={this.removeClick.bind(this, i)}/>
            </div>
        )
    }

    addClick(e) {
        e.preventDefault();
        this.setState(prevState => ({screenshots: [...prevState.screenshots, '']}))
    }

    removeClick(i) {
        let screenshots = [...this.state.screenshots];
        screenshots.splice(i, 1);
        this.setState({screenshots});
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

    addMovie(e) {
        e.preventDefault();
        const duration = this.refs.duration.value.split(':')
        const genre = this.state.multiSelections['genre']
        const format = this.state.multiSelections['format']
        const technology = this.state.multiSelections['technology']
        const startDate = this.refs.startDate.value.split('-');
        const movie = {
            name: this.refs.title.value,    // +
            image: cloudinaryImage + this.refs.image.value,   // ++++
            rating: parseFloat(this.refs.rating.value),     // +
            cast: '',
            description: this.refs.description.value,   // +
            screenshots: [],
            trailer: this.refs.trailer.value,   // +++
            genre: genre.join(', '),    // +++
            Schedule: '',
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
        headers.append('Content-Type', 'application/json')

        fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(movie)
        }).then((res) => res.json())
        console.log('posting has finished');
    }


    render() {
        const {multiSelections} = this.state;
        console.log(multiSelections);
        return <div className={b()}>
            <form className={b('form')} onSubmit={this.addMovie.bind(this)}>
                <h5>Title</h5>
                <input ref='title' placeholder={'Title'} type='text'/>

                <h5>Image</h5>
                <input ref='image' placeholder={'Enter image url'} type='url'/>

                <h5>Description</h5>
                <input ref='description' placeholder={'Description'} type='text'/>

                <h5>Trailer</h5>
                <input ref='trailer' placeholder={'Enter video url'} type='url'/>

                <h5>Rating</h5>
                <input ref='rating' placeholder={'Enter only number'} type='number' min='0' max='10' step='0.1'
                       name='rating'/>

                <h5>Duration</h5>
                <input ref='duration' type="time"/>

                <h5>Start Date</h5>
                <input ref='startDate' type="date" name='startDate'/>

                <h5>Screenshots</h5>
                <button onClick={this.addClick.bind(this)}>+</button>
                {this.createList()}

                <h5>Schedule</h5>   /*add functionality*/
                <p>тут має бути розклад :З</p>

                <h5>Genre</h5>
                <InputField action={this.handleSelect.bind(this)} name={'genre'} array={genres} />

                <h5>Format</h5>
                <InputField action={this.handleSelect.bind(this)} name={'format'} array={formats} />

                <h5>Technology</h5>
                <InputField action={this.handleSelect.bind(this)} name={'technology'} array={technologies} />

                <input type='submit' value='Submit'/>
            </form>
        </div>;
    }
}

export default AddMovieLayout;