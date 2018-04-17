import React, {Component} from "react";
import "../styles/AddActor.less";
import block from '../helpers/BEM';

const b = block("AddActor");

let typingTimer;
let doneTypingInterval = 500;
let nameTypingInterval = 1000;

class AddActor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestedMovies: [[{id: 1, name: ""}]],      //список всіх фільмів які відповідають кожному інпут полю
            currentSearchPhrase: [" "],                  //конкретно кожен інпут
            currentSugestedMovies: [{id: 1, name: ""}],   // поточний фільм, який шукаємо
            movies: [{name: ""}],                          //всі фільми , тобто це той вигляд який має бд
            currentInputIndex: 0
        };
        this.addActorToDB = this.addActorToDB.bind(this);
        this.checkform = this.checkform.bind(this);
        this.doneTyping = this.doneTyping.bind(this);
        this.doneTypingNaming = this.doneTypingNaming.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }

    addActorToDB(e) {
        let submitButton = document.querySelector(".AddActor__button");
        console.log(submitButton.style.display);
        if (submitButton.style.display == 'none' ) {
            console.log(submitButton.style.display);
            e.preventDefault();
            return;
        }
        e.preventDefault();
        console.log("POSTING...");
        let actorForm = document.querySelector(".AddActor");
        actorForm.style.display = "none";

        let actorPostSuccess = document.querySelector(".AddActor__success");
        actorPostSuccess.style.display = "initial";
        console.log("name:", this.refs.name.value);

        let createdMovies = {};
        let movieInputs = document.querySelectorAll(".AddActor__inputs_movie");
        for (let i = 0; i < movieInputs.length; i++) {
            console.log("value", movieInputs[i].value);
            console.log("ALL MOVIES", this.state.suggestedMovies);
            for (let j = 0; j < this.state.suggestedMovies[i].length; j++) {
                if (this.state.suggestedMovies[i][j].name != "" && this.state.suggestedMovies[i][j].name === movieInputs[i].value) {
                    let key = this.state.suggestedMovies[i][j].id;
                    createdMovies[key] = this.state.suggestedMovies[i][j].name;
                }
            }
        }


        const actor = {
            id: this.refs.name.value,
            movies: createdMovies,
            info: this.refs.info.value,
            date: this.refs.date.value,
            city: this.refs.city.value,
            nominations: this.refs.nominations.value.split(","),
            image: "https://res.cloudinary.com/demo/image/fetch/w_275,h_408,c_thumb,g_face/"
        };

        console.log(actor);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch('http://localhost:3000/actors', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(actor)
        }).then((res) => res.json());
        console.log('posting has finished');
    }

    checkform() {

        let f = document.querySelectorAll(".AddActor__inputs");
        let cansubmit = true;

        clearTimeout(typingTimer);
        console.log("HERE:",document.querySelector(".AddActor__inputs_name").style.backgroundColor);
        if(document.querySelector(".AddActor__inputs_name").style.backgroundColor != "white"){
            cansubmit = false;
        }
        for (let i = 0; i < f.length; i++) {
            if (f[i].value.length == 0) cansubmit = false;
        }

        let submitButton = document.querySelector(".AddActor__button");
        submitButton.style.display = (cansubmit) ? 'block' : 'none';

    }

    async doneTyping() {
        console.log("DONE TIMER");
        let index = this.state.currentInputIndex;
        if (this.state.currentSearchPhrase[index] !== "") {
            const response = await fetch(`http://localhost:3000/movies?name_like=${this.state.currentSearchPhrase[index]}&_limit=2`);// 'posts' to get work the url
            if (!response.ok) {
                console.log("ERROR IN MOVIE SEARCH AT ACTOR ADD");
            } else {
                let currentInput = document.querySelectorAll(".AddActor__inputs_movie")[index];
                console.log(currentInput);
                let suggestedMoviesOnIndex = await ((response).json());
                console.log("Sug:", suggestedMoviesOnIndex);
                if (suggestedMoviesOnIndex.length !== 0) {
                    console.log("here!!!");
                    currentInput.style.backgroundColor = 'white';
                    let changedMovies = this.state.suggestedMovies;
                    changedMovies[index] = suggestedMoviesOnIndex;
                    this.setState({suggestedMovies: changedMovies});
                    this.setState({currentSugestedMovies: suggestedMoviesOnIndex});
                } else {
                    currentInput.style.backgroundColor = '#ea8685';
                }
            }
        }
    }

    async doneTypingNaming(){
        console.log("DONE TIMER NAMING");
        if (this.refs.name.value !== " " && this.refs.name.value !== "" ) {
            const response = await fetch(`http://localhost:3000/actors/${this.refs.name.value}`);
            let currentInput = document.querySelector(".AddActor__inputs_name");
            currentInput.style.backgroundColor = (response.ok) ?'#ea8685' : 'white';
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
        }else{
            typingTimer = setTimeout(this.doneTypingNaming, nameTypingInterval);
        }

    }

    addMovie(e) {
        e.preventDefault();
        this.setState(prevState => {
            const arr = [...prevState.movies, {
                name: '',
                id: ''
            }];
            return {movies: arr};
        });
        this.setState(prevState => {
            const arr = [...prevState.suggestedMovies, [{
                name: '',
                id: ''
            }]];
            return {suggestedMovies: arr};
        });
    }

    createListOfMovies() {
        return this.state.movies.map((m, j) => {
            return <div key={j}>
                <input value={m.name} placeholder={'Enter movie'} className={b("inputs", ["movie"])} type="text"
                       list="movies" onKeyDown={this.checkform} onChange={this.doneMovie.bind(this, j)}
                       onKeyUp={(e) => this.startTimer(e, j)}/>
                <input type='button' value='-' className={b('remove-button')}
                       onClick={this.removeMovie.bind(this, j)}/>
                <datalist id="movies">
                    {this.state.currentSugestedMovies.map(movie => <option value={movie.name}/>)}
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

        let sugestedMovies = this.state.suggestedMovies;
        const suggestedArr = [
            ...sugestedMovies.slice(0, index),
            ...sugestedMovies.slice(index + 1)
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
        const arr = [
            ...this.state.movies.slice(0, index),
            Object.assign({}, {name: curentInputToDone.value}),
            ...this.state.movies.slice(index + 1)
        ];
        this.setState({movies: arr});
    }

    render() {
        return (<div>
            <h1 className={b("success")}>POSTING SUCCESSFUL</h1>

            <form className={b()} name="actorform">
                <h3 className={b('title')}>Name</h3>
                <input ref='name' placeholder={'Enter name'} className={b("inputs", ["name"])} type="text"
                       onKeyDown={this.checkform} onKeyUp={(e) => this.startTimer(e, "naming")}/>
                <h3 className={b('title')}>Date of birth</h3>
                <input ref='date' placeholder={'Enter  date of birth'} className={b("inputs")} type="date"
                       onKeyDown={this.checkform}/>
                <h3 className={b('title')}>City of birth</h3>
                <input ref='city' placeholder={'Enter city of birth'} className={b("inputs")} type="text"
                       onKeyDown={this.checkform}/>
                <h3 className={b('title')}>Nominations</h3>
                <input ref='nominations' placeholder={'Enter nominations'} className={b("inputs")} type="text"
                       onKeyDown={this.checkform}/>
                <h3 className={b('title')}>Short information</h3>
                <input ref='info' placeholder={'Enter short information'} className={b("inputs")} type="text"
                       onKeyDown={this.checkform}/>
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