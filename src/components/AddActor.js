import React, {Component} from "react";
import "../styles/AddActor.less";
import block from '../helpers/BEM';

const b = block("AddActor");

let typingTimer;
let doneTypingInterval = 500;

class AddActor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestedMovies: [{id: 1, name: ""}],
            currentSearchPhrase: " ",
            sugestedMovie:{id: 1, name: ""},
            movies:[{name:"", id :""}]
        };
        this.addActorToDB = this.addActorToDB.bind(this);
        this.checkform = this.checkform.bind(this);
        this.doneTyping = this.doneTyping.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }

    addActorToDB(e) {
        let submitButton = document.querySelector(".AddActor__button");
        console.log(submitButton.style.display);
        if (submitButton.style.display == 'none') {
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
        const actor = {
            id: this.refs.name.value,
            movies: {
                "6": "The Post"
            },
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
        for (let i = 0; i < f.length; i++) {
            if (f[i].value.length == 0) cansubmit = false;
        }

        let submitButton = document.querySelector(".AddActor__button");
        submitButton.style.display = (cansubmit) ? 'block' : 'none';

    }

    async doneTyping(e) {
        console.log("DONE TIMER");
        // if (this.refs.movies.value !== "" &&!this.refs.movies.value.startsWith(this.state.currentSearchPhrase)){
        if (this.state.currentSearchPhrase !== ""){
            //
            // let currentSearchPhrase = this.refs.movies.value;
            // this.setState({currentSearchPhrase});
            const response = await fetch(`http://localhost:3000/movies?name_like=${this.state.currentSearchPhrase}`);// 'posts' to get work the url
            if (!response.ok) {
                console.log("ERROR IN MOVIE SEARCH AT ACTOR ADD");
            } else {
                let suggestedMovies = await ((response).json());
                if (suggestedMovies != []) {
                    this.setState({suggestedMovies});
                    console.log("SUGESTED", this.state.suggestedMovies);
                }
            }
        }
    }

    startTimer(e) {
        clearTimeout(typingTimer);
        this.setState({currentSearchPhrase: e.target.value});
        typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
    }

    addMovie(e){
        e.preventDefault();
        this.setState(prevState => {
            const arr = [...prevState.movies, {
                name: '',
                id: ''
            }];
            return {movies: arr};
        });
    }
    createListOfMovies() {
        console.log("MOVIES:", this.state.movies);
        return this.state.movies.map((m, j) => {
            return <div key={j}>
                <input ref='movies' value={m.name} placeholder={'Enter movie'} className={b("inputs", ["movie"])} type="text"
                        list="movies" onKeyDown={this.checkform}  onChange={this.doneMovie.bind(this, j)} onKeyUp={(e)=>this.startTimer(e,j)}/>
                <datalist id="movies">
                    {this.state.suggestedMovies.map(movie => <option value={movie.name}/>)}
                </datalist>

                <input type='button' value='-' className={b('remove-button')}
                       onClick={this.removeMovie.bind(this, j)}/>
            </div>
        })
    }

    removeMovie(index){
        let movies = [...this.state.movies];
        const arr = [
            ...movies.slice(0, index),
            ...movies.slice(index + 1)
        ];
        this.setState({movies: arr});
    }

    doneMovie(index){
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
                <input ref='name' placeholder={'Enter name'} className={b("inputs")} type="text"
                       onKeyDown={this.checkform}/>
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
                {/*<input ref='movies' placeholder={'Enter movie'} className={b("inputs")} type="text"*/}
                       {/*onKeyDown={this.checkform} onKeyUp={this.startTimer} list="movies"/>*/}
                {/*<datalist id="movies">*/}
                    {/*{this.state.suggestedMovies.map(movie => <option value={movie.name}/>)}*/}
                {/*</datalist>*/}
                <button type='submit' className={b('button')} onClick={this.addActorToDB}>Submit
                </button>
            </form>
        </div>)
    }
}

export default AddActor;