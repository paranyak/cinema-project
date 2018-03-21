import React, {Component} from "react";
import "../../styles/AddMovieLayout.less";
import block from '../../helpers/BEM';
import InputField from "./InputField";

const b = block("AddMovieLayout");


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
            actors: {},
            multiSelections: {
            genre: [],
                format: [],
                technology: []
            }
        };
        // this.movieInputs = {
        //     name: 'input',
        //     image: 'upload',
        //     rating: 'input',
        //     description: 'textarea',
        //     screenshots: 'add',
        //     trailer: 'upload',
        //     genre: 'checkbox',
        //     format: 'checkbox',
        //     technology: 'checkbox',
        //     duration: 'input',
        //     label: 'input',
        //     startDate: 'list',
        //     actors: 'add'
        // }
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

    render() {
        const {screenshots, multiSelections} = this.state;
        console.log('---', multiSelections);
        return <div className={b()}>
            <form className={b('form')}>
                <h5>Title</h5>
                <input placeholder={'Title'} type='text' name='name'/>

                <h5>Image</h5>
                <input placeholder={'Enter image url'} type='url' name='image'/>

                <h5>Description</h5>
                <input placeholder={'Description'} type='text' name='description'/>

                <h5>Rating</h5>
                <input placeholder={'Enter only number'} type='number' min='0' max='10' step='0.1' name='rating'/>

                <h5>Duration</h5>
                <input type="time"/>

                <h5>Start Date</h5>
                <input type="date" name='startDate'/>

                <h5>Screenshots</h5>
                <button onClick={this.addClick.bind(this)}>+</button>
                {this.createList()}

                <h5>Genre</h5>
                {genres.map((g, i) => {
                    return (
                        <div>
                            <input key={i} type="checkbox" name='genre' value={g}
                                   onChange={this.handleSelect.bind(this)}/>
                            <label>{g}</label>
                        </div>
                    );
                })
                }

                <h5>Format</h5>
                {formats.map((f, i) => {
                    return (
                        <div>
                            <input key={i} type="checkbox" name='format' value={f}
                                   onChange={this.handleSelect.bind(this)}/>
                            <label>{f}</label>
                        </div>
                    );
                })
                }

                <h5>Technology</h5>
                {technologies.map((t, i) => {
                    return (
                        <div>
                            <input key={i} type="checkbox" name='technology' value={t}
                                   onChange={this.handleSelect.bind(this)}/>
                            <label>{t}</label>
                        </div>
                    );
                })
                }

                <input type='submit' value='Submit'/>
            </form>
        </div>;
    }
}

export default AddMovieLayout;