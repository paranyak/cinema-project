import React, {Component} from "react";

import "../styles/MovieImage.less";
import block from "../helpers/BEM";

const b = block("MovieImage");


class MovieImage extends Component {
    constructor(props) {
        super(props);
        this.state = {sources: [], currentId: 0};
        this.closeHandler = this.closeHandler.bind(this);
        this.handleKey = this.handleKey.bind(this);
    }

    closeHandler() {
        let modal = document.getElementById('myModal');
        modal.style.display = 'none';
        //REMOVE ALL EVENT LISTENERS
        let clone = modal.cloneNode();
        window.removeEventListener('keydown', this.handleKey);
        while (modal.firstChild) {
            clone.appendChild(modal.lastChild);
        }
        modal.parentNode.replaceChild(clone, modal);
        //
    }

    handleKeyPress(event) {
        let newId;
        console.log("EVENT:", event);
        let id = this.state.currentId;
        if (event.clientX >= event.target.clientWidth / 2) {
            newId = id >= this.state.sources.length - 1 ? 0 : id + 1;
        }
        else {
            newId = id - 1 < 0 ? this.state.sources.length - 1 : id - 1;
        }
        this.setState({currentId: newId});
        let modalImg = document.getElementById("img01");
        modalImg.src = this.state.sources[newId];

    }

    handleKey(event){
        console.log("HERE key!!!!");
        console.log("KEY EVENT:", event.keyCode)
        if(event.keyCode === 27){
            this.closeHandler();
        }
    }


    mainImageHandler(e, id) {
        console.log("MAIN IMAGE HANDLER");
        this.setState({currentId: id});
        let modal = document.getElementById('myModal');
        let modalImg = document.getElementById("img01");
        modal.style.display = "block";
        modalImg.src = this.state.sources[id];
        modal.addEventListener("click", (e) => this.handleKeyPress(e, id), false);
        window.addEventListener('keydown', this.handleKey);
    }

    changeImage(e, id) {
        this.setState({currentId: id});
        let modalImg = document.getElementById("img01");
        modalImg.src = this.state.sources[id];

    }

    componentWillMount(){
        const {film} = this.props;
        let sourcesArray = [film.image];
        film.screenshots.map(
            screen => sourcesArray.push(screen)
        );
        this.setState({sources: sourcesArray});
    }

    componentWillUpdate(nextProps) {
        console.log("NEXT CWU: ", nextProps);
        if (nextProps != this.props) {
            console.log("UPDATE in MI");
            const {film} = nextProps;
            console.log("FILM: ", film);
            let sourcesArray = [film.image];
            film.screenshots.map(
                screen => sourcesArray.push(screen)
            );
            this.setState({sources: sourcesArray});
            return true;
        }
        return false;
    }

    render() {

        const {film} = this.props;
        return (
            <section className={b()}>
                <img src={film.image} className={b("main")} onClick={(e, src) => this.mainImageHandler(e, 0)}/>
                <section className={b("screenshots")}>
                    {film.screenshots.map((screen, ind) => <img src={screen} key={ind} className={b("screen")}
                                                                onClick={(e, src) => this.mainImageHandler(e, ind + 1)}/>)}
                </section>

                <div id="myModal" className={b("modal")}>
                    <span className={b("close")} onClick={(e) => this.closeHandler(e)}>&times;</span>
                    <img className={b("modal-content")} id="img01"/>
                    <div className={b("arrow-left")}></div>
                    <div className={b("arrow-right")}></div>
                    <section className={b("screenshots-modal")}>
                        {this.state.sources.map((screen, ind) => <img src={screen} key={ind}
                                                                      className={b("screen-modal")}
                                                                      onClick={(e) => this.changeImage(e, ind)}/>)}
                    </section>
                </div>
            </section>
        )
    }
}

export default MovieImage