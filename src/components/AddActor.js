import React, {Component} from "react";
import "../styles/AddActor.less";
import block from '../helpers/BEM';

const b = block("AddActor");

let typingTimer;
let doneTypingInterval = 500;

class AddActor extends Component {
    constructor(props) {
        super(props);
        this.state={
            suggestedMovies:[{"id": 1, name:""}]
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
        actorPostSuccess.style.display="initial";
        console.log("name:", this.refs.name.value);
        const actor = {
            id: this.refs.name.value,
            movies: {
                "6": "The Post"
            },
            info: this.refs.info.value,
            date: this.refs.date.value,
            city: this.refs.city.value,
            nominations: [
                ""
            ],
            image: "https://res.cloudinary.com/demo/image/fetch/w_275,h_408,c_thumb,g_face/"
        };

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
        console.log("cleared", typingTimer);
        for (let i = 0; i < f.length; i++) {
            if (f[i].value.length == 0) cansubmit = false;
        }

        let submitButton = document.querySelector(".AddActor__button");
        submitButton.style.display = (cansubmit) ? 'initial' : 'none';

    }
    async doneTyping () {
        //do something
        console.log("DONE TIMER");
        console.log(this.refs.movies.value);
        console.log(this.state.suggestedMovies);

        const response = await fetch(`http://localhost:3000/movies?name_like=${this.refs.movies.value}`);// 'posts' to get work the url
        if (!response.ok) {
            console.log("ERROR IN ACTOR");
        } else {
            let suggestedMovies = await ((response).json());
            if (suggestedMovies != []) {
                this.setState({suggestedMovies});
                console.log(this.state.suggestedMovies);
            }
        }
    }

    startTimer(){
        clearTimeout(typingTimer);
        typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
    }


    render() {
        return (<div>
            <h1 className={b("success")} >POSTING SUCCESSFUL</h1>

            <form className={b()} name="actorform">
                <input ref='name' placeholder={'Enter name'} className={b("inputs")} type="text"
                       onKeyDown={this.checkform}/>
                <input ref='date' placeholder={'Enter  date of birth'} className={b("inputs")} type="text"
                       onKeyDown={this.checkform}/>
                <input ref='city' placeholder={'Enter city of birth'} className={b("inputs")} type="text"
                       onKeyDown={this.checkform}/>
                <input ref='nominations' placeholder={'Enter nominations'} className={b("inputs")} type="text"
                       onKeyDown={ this.checkform}/>
                <input ref='info' placeholder={'Enter short information'} className={b("inputs")} type="text"
                       onKeyDown={this.checkform}/>
                <input ref='movies' placeholder={'Enter movie'} className={b("inputs")} type="text"
                       onKeyDown={this.checkform} onKeyUp={this.startTimer} list="movies"/>
                <datalist id="movies">
                    {this.state.suggestedMovies.map(movie=> <option value={movie.name}/>)}
                </datalist>
                <button type='submit' className={b('button')} onClick={this.addActorToDB}>Submit
                </button>
            </form>
        </div>)
    }
}

export default AddActor;