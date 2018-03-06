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
                    <div><span>{film.rating}</span></div>
                    <p className={b("genre")}><span className={b("key")}>Genre</span> {film.genre}</p>
                    <p className={b("duration")}><span className={b("key")}>Duration</span> {film.duration.hour}
                        hour {film.duration.minute} minutes</p>
                    <p className={b("format")}><span className={b("key")}>Format</span> {film.format}</p>
                    <p className={b("technology")}><span className={b("key")}>Technology</span> {film.technology}</p>
                </div>
                <Actors film={film}/>
            </div>
        )
    }
}

export default MovieInfo
