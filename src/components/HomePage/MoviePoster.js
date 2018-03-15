import React, {Component} from "react";
import "../../styles/MoviePoster.less";
import block from "../../helpers/BEM";
const b = block("MoviePoster");

class MoviePoster extends Component {
    render() {
        const {film} = this.props;
        return (
            <article className={b()}>
                <img src={film.image} className={b("image")}/>
                <footer className={b("additional-info")}>
                    <h3 className={b('name')}>{film.name}</h3>
                    <p className={b('genre')}>{film.genre}</p>
                    <span className={b('rating')}>{film.rating}</span>
                </footer>
            </article>
        )
    }
}

export default MoviePoster;