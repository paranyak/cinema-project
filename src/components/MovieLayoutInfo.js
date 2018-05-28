import React, {Component} from 'react'
import Actors from "./Actors";
import "../styles/MovieLayoutInfo.less";
import block from "../helpers/BEM";

const b = block("MovieLayoutInfo");

class MovieLayoutInfo extends Component {
    render() {
        const {film} = this.props;
        const strokeFull = film.rating * 10;
        const strokeEmpty = 100 - strokeFull;
        const strokeArray = "" + strokeFull + " " + strokeEmpty + "";
        const format = (typeof film.format === 'string') ? film.format : film.format.join(", ");
        const technology = (typeof film.technology === 'string') ? film.technology : film.technology.join(", ");

        return (
            <section className={b()}>
                <h1 className={b("name")}>{film.name}</h1>
                <p className={b("description")}> {film.description}</p>
                <div className={b("extra")}>
                    <div className={b("rating")}>
                        <span className={b("rating-value")}>{film.rating}</span>
                        <svg width="100%" height="100%" viewBox="0 0 42 42" className={b("donut")}>
                            <circle className={b("donut-ring")} cx="21" cy="21" r="15.91549430918954" fill="transparent"
                                    stroke="transparent" strokeWidth="3"></circle>
                            <circle className={b("donut-segment")} cx="21" cy="21" r="15.91549430918954"
                                    fill="transparent" stroke="#FAE807" strokeWidth="3" strokeDasharray={strokeArray}
                                    strokeDashoffset="25"></circle>
                        </svg>
                    </div>
                    <p className={b("genre")}>
                        Genre
                        <span className={b("value")}>{film.genre}</span>
                    </p>
                    <p className={b("duration")}>
                        Duration
                        <span className={b("value")}>{film.duration.hour}h {film.duration.minute}m </span>
                    </p>
                    <p className={b("format")}>
                        Format
                        <span className={b("value")}>{format}</span>
                    </p>
                    <p className={b("technology")}>
                        Technology
                        <span className={b("value")}>{technology}</span>
                    </p>
                </div>
                <section className={"Actors"}>
                    {film.cast.map(actor => <Actors id={actor} key={actor}/>)}
                </section>

            </section>
        )
    }
}

export default MovieLayoutInfo;
