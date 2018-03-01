import React, {Component} from "react";
import {getAllMovies} from "../reducers";
import {removeMovie} from "../actions";
import {Interval} from "luxon/src/interval.js";
import {Duration} from "luxon/src/duration.js";
import {DateTime} from "luxon/src/datetime.js";

import {connect} from "react-redux";

import "../styles/Schedule.less";

import block from "../helpers/BEM";

const b = block("Schedule");

class Schedule extends Component {
    constructor(props) {
        super(props);

        const sessionStart = DateTime.fromObject({
            year: 2018,
            month: 3,
            day: 1,
            hour: 8,
            minute: 0
        });

        const scheduleInterval = Interval.after(sessionStart, {hours: 16});

        this.scale = (t) => 100 * t / scheduleInterval.toDuration().milliseconds;

        this.state = {
            startTime: sessionStart,
            session: scheduleInterval.splitBy({minutes: 30})
        };
    }

    render() {
        const {session, startTime} = this.state;
        const {films, onMovieClick} = this.props;
        return (
            <div className={b()}>
                <div className={b("header")}>
                    <div className={b("day")}>
                        DAY: {startTime.toFormat("yyyy LLL dd")}
                    </div>
                    <div className={b("time-string")}>
                        {session.map((time, i) => (
                            <span className={b("time-item")} key={i}>
                               {time.start.toFormat("HH:mm")}
                            </span>
                        ))}
                    </div>
                </div>
                <div className={b("film-list")}>
                    {films.map((film, i) => (
                        <div key={"div-1lev" + i.toString()} className={b("film")}>
                            <span key={i} className={b("film-name")}
                                  onClick={() => onMovieClick(films.id)}>{film.name}</span>
                            <div key={"div-2lev" + i.toString()} className={b("film-schedule")}>
                                {film.schedule.map((s, i) => (
                                    <span key={i} className={b("film-schedule-item")}
                                          style={{
                                              top: i * 7,
                                              width: this.scale(s.toDuration().milliseconds) + "%",
                                              left: this.scale(
                                                  Interval.fromDateTimes(
                                                      startTime, s.start
                                                  ).toDuration().milliseconds
                                              ) + "%"
                                          }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMovieClick: (id) => {
            dispatch(removeMovie(id))
        }
    }
};

export default connect(state => {
        const movies = getAllMovies(state);

        return {
            films: movies.map(movie => ({
                name: movie.name,
                schedule: movie.Schedule.map(start =>
                    Interval.after(DateTime.fromFormat(start, "HH:mm"), {
                        hour: 2,
                        minute: 0
                    })
                ),
                id: movie.id
            }))
        };
    },
    mapDispatchToProps
)(Schedule);
