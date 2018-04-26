import React, {Component} from "react";
import "../styles/AddActor.less";
import block from '../helpers/BEM';
import DragDropImage from "./DragDropImage";
import {monthNames} from '../helpers/constants'

const b = block("AddActor");

let typingTimer;
let doneTypingInterval = 500;
let nameTypingInterval = 1000;

class AddActor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestedMovies: [[{id: 1, name: "", role: ""}]],      //список всіх фільмів які відповідають кожному інпут полю
            currentSearchPhrase: [" "],                  //конкретно кожен інпут
            currentSuggestedMovies: [{id: 1, name: ""}],   // поточний фільм, який шукаємо
            movies: [{name: "", role: ""}],                          //всі фільми , тобто це той вигляд який має бд
            currentInputIndex: 0,
            actor: ''
        };
        this.addActorToDB = this.addActorToDB.bind(this);
        this.checkform = this.checkform.bind(this);
        this.doneTyping = this.doneTyping.bind(this);
        this.doneTypingNaming = this.doneTypingNaming.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.myCallback2 = this.myCallback2.bind(this);
    }

    addActorToDB(e) {
        let submitButton = document.querySelector(".AddActor__button");
        if (submitButton.style.display === 'none') {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        console.log("POSTING...");
        let actorForm = document.querySelector(".AddActor");
        actorForm.style.display = "none";

        let actorPostSuccess = document.querySelector(".AddActor__success");
        actorPostSuccess.style.display = "initial";

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let createdMovies = {};
        let movieInputs = document.querySelectorAll(".AddActor__inputs_movie");
        for (let i = 0; i < movieInputs.length; i++) {
            for (let j = 0; j < this.state.suggestedMovies[i].length; j++) {
                if (this.state.suggestedMovies[i][j].name !== "" && this.state.suggestedMovies[i][j].name === movieInputs[i].value) {
                    let key = this.state.suggestedMovies[i][j].id;
                    let newArrayCast = this.state.suggestedMovies[i][j].cast;
                    newArrayCast.push(this.refs.name.value);
                    let newData = {};
                    newData["cast"] = newArrayCast;
                    fetch(`http://localhost:3000/movies/${key}`, {
                        method: 'PATCH',
                        headers: headers,
                        body: JSON.stringify(newData)
                    }).then((res) => res.json());

                    createdMovies[key] = [this.state.suggestedMovies[i][j].name, this.state.movies[i].role];
                }
            }
        }

        const date = this.refs.date.value;
        const dateArr = date.split('-');
        const month = monthNames[parseInt(dateArr[1]) - 1];
        const year = dateArr[0];
        const day = dateArr[2];
        const birthDay = month + ' ' + day + ', ' + year;

        const actorToAdd = {
            id: this.refs.name.value,
            movies: createdMovies,
            info: this.refs.info.value,
            date: birthDay,
            city: this.refs.city.value,
            nominations: this.refs.nominations.value.split(","),
            image: this.state.actor
        };

        console.log('added actor', actorToAdd);

        fetch('http://localhost:3000/actors', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(actorToAdd)
        }).then((res) => res.json());

        console.log('Posting has finished');
    }

    checkform() {

        let f = document.querySelectorAll(".AddActor__inputs_required");
        let cansubmit = true;

        clearTimeout(typingTimer);
        if (document.querySelector(".AddActor__inputs_name").style.backgroundColor !== "white") {
            cansubmit = false;
        }
        for (let i = 0; i < f.length; i++) {
            if (f[i].value.length === 0) cansubmit = false;
        }

        let submitButton = document.querySelector(".AddActor__button");
        submitButton.style.display = (cansubmit) ? 'block' : 'none';

    }

    async doneTyping() {
        let index = this.state.currentInputIndex;
        if (this.state.currentSearchPhrase[index] !== "") {
            const response = await fetch(`http://localhost:3000/movies?name_like=\\b${this.state.currentSearchPhrase[index]}`);// 'posts' to get work the url
            if (!response.ok) {
                console.log("ERROR IN MOVIE SEARCH AT ACTOR ADD");
            } else {
                let currentInput = document.querySelectorAll(".AddActor__inputs_movie")[index];
                let suggestedMoviesOnIndex = await ((response).json());
                if (suggestedMoviesOnIndex.length !== 0) {
                    currentInput.style.backgroundColor = 'white';
                    let changedMovies = this.state.suggestedMovies;
                    changedMovies[index] = suggestedMoviesOnIndex;
                    this.setState({suggestedMovies: changedMovies});
                    this.setState({currentSuggestedMovies: suggestedMoviesOnIndex});
                } else {
                    currentInput.style.backgroundColor = '#ea8685';
                }
            }
        }
    }

    async doneTypingNaming() {
        console.log("DONE TIMER NAMING");
        if (this.refs.name.value !== " " && this.refs.name.value !== "") {
            const response = await fetch(`http://localhost:3000/actors/${this.refs.name.value}`);
            let currentInput = document.querySelector(".AddActor__inputs_name");
            currentInput.style.backgroundColor = (response.ok) ? '#ea8685' : 'white';
        }
        this.checkform();
    }

    startTimer(e, currentInputIndex) {
        clearTimeout(typingTimer);
        if (currentInputIndex !== "naming") {
            let changedSearch = this.state.currentSearchPhrase;
            changedSearch[currentInputIndex] = e.target.value;
            this.setState({currentSearchPhrase: changedSearch});
            this.setState({currentInputIndex});
            typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
        } else {
            typingTimer = setTimeout(this.doneTypingNaming, nameTypingInterval);
        }

    }

    addMovie(e) {
        e.preventDefault();
        this.setState(prevState => {
            const arr = [...prevState.movies, {
                name: '',
                id: '',
                role: ''
            }];
            return {movies: arr};
        });
        this.setState(prevState => {
            const arr = [...prevState.suggestedMovies, [{
                name: '',
                id: '',
                role: ''
            }]];
            return {suggestedMovies: arr};
        });
    }

    createListOfMovies() {
        return this.state.movies.map((m, j) => {
            return <div key={j}>
                <input value={m.name} placeholder={'Enter movie'} className={b("inputs", ["movie", "required"])}
                       type="text"
                       list="movies" onChange={this.doneMovie.bind(this, j)}
                       onKeyUp={(e) => this.startTimer(e, j)}/>
                <input value={m.role} placeholder={'Enter role'} className={b("inputs", ["role", "required"])}
                       type="text"
                       onChange={this.doneMovie.bind(this, j)}/>
                <input type='button' value='-' className={b('remove-button')}
                       onClick={this.removeMovie.bind(this, j)}/>
                <datalist id="movies">
                    {this.state.currentSuggestedMovies.map(movie => <option value={movie.name}/>)}
                </datalist>
            </div>
        })
    }

    removeMovie(index) {
        let movies = [...this.state.movies];
        const arr = [
            ...movies.slice(0, index),
            ...movies.slice(index + 1)
        ];

        let suggestedMovies = this.state.suggestedMovies;
        const suggestedArr = [
            ...suggestedMovies.slice(0, index),
            ...suggestedMovies.slice(index + 1)
        ];

        let currentSearchPhrase = this.state.currentSearchPhrase;
        const searchPhrasesArr = [
            ...currentSearchPhrase.slice(0, index),
            ...currentSearchPhrase.slice(index + 1)
        ];
        this.setState({movies: arr});
        this.setState({suggestedMovies: suggestedArr});
        this.setState({currentSearchPhrase: searchPhrasesArr});

    }

    doneMovie(index) {
        let curentInputToDone = document.querySelectorAll(".AddActor__inputs_movie")[index];
        let curentRoleToDone = document.querySelectorAll(".AddActor__inputs_role")[index];
        const arr = [
            ...this.state.movies.slice(0, index),
            Object.assign({}, {name: curentInputToDone.value, role: curentRoleToDone.value}),
            ...this.state.movies.slice(index + 1)
        ];
        this.setState({movies: arr});
        this.checkform();
    }

    myCallback2(name, item) {
        this.setState({[name]: item})
    }

    render() {
        return (<div>
            <h1 className={b("success")}>POSTING SUCCESSFUL</h1>

            <form className={b()} name="actorform">
                <h3 className={b('title')}>Name</h3>
                <input ref='name' placeholder={'Enter name'} className={b("inputs", ["name", "required"])} type="text"
                       onChange={this.checkform} onKeyUp={(e) => this.startTimer(e, "naming")}/>
                <h3 className={b('title')}>Image</h3>
                <div className={b('image')}>
                    <DragDropImage value={''} name='actor' callbackFromParent={this.myCallback2}
                                   callbackInRemove={this.myCallback2}/>
                </div>

                <h3 className={b('title')}>Date of birth</h3>
                <input ref='date' placeholder={'Enter  date of birth'} className={b("inputs", ["required"])} type="date"
                       onChange={this.checkform}/>
                <h3 className={b('title')}>City of birth</h3>
                <input ref='city' placeholder={'Enter city of birth'} className={b("inputs", ["required"])} type="text"
                       onChange={this.checkform}/>
                <h3 className={b('title')}>Nominations</h3>
                <input ref='nominations' placeholder={'Enter nominations'} className={b("inputs")} type="text"
                       onChange={this.checkform}/>
                <h3 className={b('title')}>Short information</h3>
                <textarea ref='info' placeholder={'Enter short information'} className={b("inputs", ["required"])}
                          onChange={this.checkform}/>
                <h3 className={b('title')}>Movies</h3>

                <div className={b('movies-block')}>
                    <button className={b('add-button')} onClick={this.addMovie.bind(this)}>+</button>
                    {this.createListOfMovies()}
                </div>
                <button type='submit' className={b('button')} onClick={this.addActorToDB}>Submit
                </button>
            </form>
        </div>)
    }
}

export default AddActor;