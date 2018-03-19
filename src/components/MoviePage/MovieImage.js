import React, {Component} from "react";

import "../../styles/MovieImage.less";
import block from "../../helpers/BEM";

const b = block("MovieImage");


class MovieImage extends Component {
    constructor(props) {
        super(props);
        this.state = {sources: [], currentId: 0};
    }



    handleKeyPress(event) {
        let newId;
        let id = this.state.currentId;
        if (event.clientX >= event.path[event.path.length - 1].innerWidth / 2) {
            newId = id >= this.state.sources.length - 1 ? 0 : id + 1;
        }
        else {
            newId = id - 1 < 0 ? this.state.sources.length - 1 : id - 1;
        }
        this.setState({currentId: newId});
        let modalImg = document.getElementById("img01");
        modalImg.src = this.state.sources[newId];

    }
    // setInterval(function() {
    //     console.log("here");
    //     let modal = document.getElementById('myModal');
    //     let evt = document.createEvent("HTMLEvents");
    //     evt.initEvent("click", false, true);
    //     modal.dispatchEvent(evt);
    // }, 6000);


    mainImageHandler(e, id) {
        console.log("THIS ID:", id, "STATE:", this.state.currentId);
        this.setState({currentId: id});
        let modal = document.getElementById('myModal');
        let modalImg = document.getElementById("img01");
        modal.style.display = "block";
        modalImg.src = this.state.sources[id];
        modal.addEventListener("click", (e) => this.handleKeyPress(e, id), false);
    }

    closeHandler() {
        let modal = document.getElementById('myModal');
        modal.style.display = 'none';
        //REMOVE ALL EVENT LISTENERS
        let clone = modal.cloneNode();
        while (modal.firstChild) {
            clone.appendChild(modal.lastChild);
        }
        modal.parentNode.replaceChild(clone, modal);
        //
    }


    componentWillMount() {
        const {film} = this.props;
        let sourcesArray = film.screenshots;
        sourcesArray.unshift(film.image);
        this.setState({sources: sourcesArray});
    }

    render() {

        const {film} = this.props;
        return (
            <section className={b()}>
                <img src={film.image} className={b("main")} onClick={(e, src) => this.mainImageHandler(e, 0)}/>
                <section className={b("screenshots")}>
                    {film.screenshots.map((screen, ind) => <img src={screen} key={ind} className={b("screen")}
                                                                onClick={(e, src) => this.mainImageHandler(e, ind)}/>)}
                </section>

                <div id="myModal" className="modal">
                    <span className="close" onClick={(e) => this.closeHandler(e)}>&times;</span>
                    <img className="modal-content" id="img01"/>
                    <div class="arrow-left"></div>
                    <div class="arrow-right"></div>

                    <section className={b("screenshots-modal")}>
                        {film.screenshots.map((screen, ind) => <img src={screen} key={ind}
                                                                    className={b("screen-modal")}/>)}
                    </section>
                </div>
            </section>
        )
    }
}

export default MovieImage