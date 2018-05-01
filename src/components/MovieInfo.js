import React, {Component} from 'react'
import Actors from "./Actors";

import "../styles/MovieInfo.less";
import block from "../helpers/BEM";

const b = block("MovieInfo");

class MovieInfo extends Component {
    render() {
        const {film} = this.props;
        const strokeFull = film.rating * 10;
        const strokeEmpty = 100 - strokeFull;
        const strokeArray = "" + strokeFull + " " + strokeEmpty + "";
        return (
            <section className={b()}>
                <h1 className={b("name")}>{film.name}</h1>
                <p className={b("description")}> {film.description}</p>
                <div className={b("extra")}>
                    <div className={b("rating")}>
                        <span className={b("rating-value")}>{film.rating}</span>
                        <svg width="100%" height="100%" viewBox="0 0 42 42" className={b("donut")}>
                            <circle className={b("donut-ring")} cx="21" cy="21" r="15.91549430918954" fill="transparent"
                                    stroke="tranparent" strokeWidth="3"></circle>
                            <circle className={b("donut-segment")} cx="21" cy="21" r="15.91549430918954"
                                    fill="transparent" stroke="#FAE807" strokeWidth="3" strokeDasharray={strokeArray}
                                    strokeDashoffset="25"></circle>
                        </svg>
                    </div>
                    <p className={b("genre")}>Genre <span className={b("value")}>{film.genre}</span></p>
                    <p className={b("duration")}>Duration <span className={b("value")}> {film.duration.hour}
                        hour {film.duration.minute} minutes </span></p>
                    <p className={b("format")}>Format <span className={b("value")}>  {film.format}</span></p>
                    <p className={b("technology")}>Technology <span className={b("value")}>  {film.technology} </span>
                    </p>
                </div>
                <section className={"Actors"}>
                    {film.cast.map(actor => <Actors id={actor} film={film.id}/>)}
                </section>

            </section>
        )
    }
}

export default MovieInfo
