import React, {Component} from "react";
import "../styles/AddActor.less";
import block from '../helpers/BEM';

const b = block("AddActor");


class AddActor extends Component {
    constructor(props) {
        super(props);
        this.addActorToDB = this.addActorToDB.bind(this);
        this.checkform = this.checkform.bind(this);

    }

    addActorToDB(e) {
        e.preventDefault();
        const actor = {
            id: "TEST ACTOR",
            movies: {
                "6": "The Post"
            },
            info: "",
            date: "",
            city: "",
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

        for (let i = 0; i < f.length; i++) {
            if (f[i].value.length == 0) cansubmit = false;
        }

        let submitButton = document.querySelector(".AddActor__button");
        submitButton.style.display = (cansubmit) ? 'initial' : 'none';

    }

    render() {
        return (<form className={b()} name="actorform">
            <h1>ACTOR: name, movies, info, date, city, nominations, image</h1>
            <input className={b("inputs")} type="text" onKeyUp={this.checkform}/>
            <input className={b("inputs")} type="text" onKeyUp={this.checkform}/>
            <input className={b("inputs")} type="text" onKeyUp={this.checkform}/>
            <button type='submit' className={b('button')} onClick={this.addActorToDB}>Submit
            </button>
        </form>)
    }
}

export default AddActor;