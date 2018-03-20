import React, {Component} from "react";
import {getAllMovies, getAllFilters} from "../../reducers";
import {removeMovie, addMovie, changeDate} from "../../actions";
import {Interval} from "luxon/src/interval.js";
import {Link} from 'react-router-dom'
import {DateTime} from "luxon/src/datetime.js";
import ReactTooltip from 'react-tooltip';
import {findDOMNode} from 'react-dom';
import { push } from 'react-router-redux';


import {connect} from "react-redux";

import "../../styles/Schedule.less";

import block from "../../helpers/BEM";

const b = block("Schedule");

class Schedule extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {films, onDateChange, date} = this.props;

        const sessionStart = date.set({
            hour: 9,
            minute: 0,
            seconds: 0,
            milliseconds: 0
        });

        const scheduleInterval = Interval.after(sessionStart, {hours: 16});

        this.scale = (t) => 100 * t / scheduleInterval.toDuration().milliseconds;
        this.globalScale = (t) => 85 * t / scheduleInterval.toDuration().milliseconds + 15;

        const session = scheduleInterval.splitBy({minutes: 60})
        return (
            <section className={b()}>
                <header className={b("header")}>
                    <time className={b("day-container")}>
                        <input className={b("day")} type="date" value={date.toFormat('yyyy-MM-dd')}
                               onChange={onDateChange}></input>
                    </time>
                    <nav className={b("time-string")}>
                        {session.map((time, i) => (
                            <time className={b("time-item")} key={i}>
                                {time.start.toFormat("HH:mm")}
                            </time>
                        ))}
                    </nav>
                </header>
                <main className={b("film-list")}>
                    <time className={b("real-time-line")}
                          style={{
                              left: this.globalScale(
                                  Interval.fromDateTimes(
                                      sessionStart, DateTime.local()
                                  ).toDuration().milliseconds
                              ) + "%",
                              display: sessionStart.hasSame(DateTime.local(), 'day') ? 'block' : 'none'
                          }}></time>
                    {films.map((film, i) => (
                        <article key={"div-1lev" + i.toString()} className={b("film")}>
                                <span key={i} className={b("film-name")}>
                                <Link className={b("film-link")} key={film.id} to={`/movie/${film.id}`}>
                                {film.name}</Link></span>

                            <section style={{'minHeight': film.schedule.length * 10}} key={"div-2lev" + i.toString()}
                                     className={b("film-schedule")}>
                                {film.schedule.map((s, i, j) => (
                                    <div key={i}>
                                        <time
                                            className={b("film-schedule-item", s.isAfter(DateTime.local()) ? ['after'] : ['before'])}
                                            data-tip={s.toFormat('HH:mm')}
                                            style={{
                                                top: i * 10,
                                                width: this.scale(s.toDuration().milliseconds) + "%",
                                                left: this.scale(
                                                    Interval.fromDateTimes(
                                                        sessionStart, s.start
                                                    ).toDuration().milliseconds
                                                ) + "%"
                                            }}
                                        />
                                        <ReactTooltip/>
                                    </div>
                                ))}
                            </section>
                        </article>
                    ))}
                </main>
            </section>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onDateChange: (event) => {
            console.log(props.history);
            dispatch(changeDate(event.target.value));
            dispatch(push('/schedule/' + event.target.value));
        }
    }
};

export default connect(state => {
        const movies = getAllMovies(state);
        const filters = getAllFilters(state);
        const date = filters.date ?
            DateTime.fromFormat(filters.date, 'yyyy-MM-dd') :
            DateTime.local();
        return {
            date,
            films: movies
                .filter((movie) => {
                    if (filters.genres.length === 0) {
                        return true;
                    }
                    let movieGenres = movie.genre.split(', ');
                    for (let i = 0; i < movieGenres.length; i++) {
                        if (filters.genres.includes(movieGenres[i])) {
                            return true;
                        }
                    }
                    return false;
                })
                .filter((movie) => {
                    if (filters.technologies.length === 0) {
                        return true;
                    }

                    for (let i = 0; i < movie.technology.length; i++) {
                        if (filters.technologies.includes(movie.technology[i])) {
                            return true;
                        }
                    }
                    return false;
                })
                .filter((movie) => {
                    if (filters.formats.length === 0) {
                        return true;
                    }

                    for (let i = 0; i < movie.format.length; i++) {
                        if (filters.formats.includes(movie.format[i])) {
                            return true;
                        }
                    }
                    return false;
                })
                .map(movie => ({
                    name: movie.name,
                    schedule: movie.Schedule
                        .filter(start => {
                            return DateTime.fromFormat(start, "dd-MM-yyyy HH:mm").hasSame(date, 'day')
                        })
                        .map(start =>
                            Interval.after(DateTime.fromFormat(start, "dd-MM-yyyy HH:mm"), {
                                hour: movie.duration.hour,
                                minute: movie.duration.minute
                            })
                        ),
                    id: movie.id
                }))
                .filter(movie => movie.schedule.length !== 0)
        };
    },
    mapDispatchToProps
)(Schedule);
