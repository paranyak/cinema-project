import React, {Component} from 'react'
import Actors from "./Actors";

import "../../styles/MovieInfo.less";
import block from "../../helpers/BEM";

const b = block("MovieInfo");

class MovieInfo extends Component {
    render() {
        const {film} = this.props;
        return (
            <div className={b()}>
                <h1 className={b("name")}>{film.name}</h1>
                <p className={b("description")}> {film.description}</p>
                <div className={b("extra")}>
                    <div className={b("rating")}><span>{film.rating}</span></div>
                    <p className={b("genre")}>Genre <span className={b("value")}>{film.genre}</span></p>
                    <p className={b("duration")}>Duration <span className={b("value")}> {film.duration.hour}
                        hour {film.duration.minute} minutes </span></p>
                    <p className={b("format")}>Format <span className={b("value")}>  {film.format}</span></p>
                    <p className={b("technology")}>Technology <span className={b("value")}>  {film.technology} </span></p>
                </div>
                <Actors film={film} />
            </div>
        )
    }
}

export default MovieInfo
