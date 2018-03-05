import React, {Component} from "react";
import "../../styles/MoviePoster.less";
import block from "../../helpers/BEM";
const b = block("MoviePoster");

class MoviePoster extends Component {
    render() {
        const {film} = this.props;
        return (
            <div className={b()}>
                <img src={film.image} className={b("image")}/>
                <div className={b("additional-info")}>
                    <div className={b('name')}>{film.name}</div>
                    <div className={b('genre')}>{film.genre}</div>
                    <span className={b('rating')}>{film.rating}</span>
                </div>
            </div>
        )
    }
}

export default MoviePoster;