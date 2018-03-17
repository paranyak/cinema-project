import React, {Component} from "react";

import "../../styles/MovieImage.less";
import block from "../../helpers/BEM";

const b = block("MovieImage");


class MovieImage extends Component {
    constructor(props) {
        super(props);
        this.state = {sources: [], currentId : 0};
    }

    handleKeyPress(event, id) {
        console.log(id, event.key, event);
        if(event.key == "ArrowRight"){
            let newId = id >= this.state.sources.length-1 ? 0: id+1;
            console.log(newId);
            this.mainImageHandler(event, newId);
        }
        if(event.key == "ArrowLeft"){
            let newId = id-1 < 0 ? this.state.sources.length-1 : id-1;
            console.log(newId);

            this.mainImageHandler(event, newId);
        }
    }

    mainImageHandler(e, id) {
        console.log("image handler", id);
        let modal = document.getElementById('myModal');
        let modalImg = document.getElementById("img01");
        modal.style.display = "block";
        modalImg.src = this.state.sources[id];
        document.addEventListener('keydown', (e) => this.handleKeyPress(e, id));

    }

    closeHandler() {
        let modal = document.getElementById('myModal');
        modal.style.display = 'none';
        console.log("REMOVED")
        document.onkeydown = null;
        console.log("REMOVED")

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
                    {film.screenshots.map((screen, ind) => <img src={screen} key={ind} className={b("screen")} onClick={(e, src) => this.mainImageHandler(e, ind)}/>)}
                </section>

                <div id="myModal" class="modal">
                    <span class="close" onClick={(e) => this.closeHandler(e)}>&times;</span>
                    <img class="modal-content" id="img01"/>
                </div>
            </section>
        )
    }
}

export default MovieImage