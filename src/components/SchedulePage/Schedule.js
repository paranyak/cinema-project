import React, {Component} from "react";
import {getAllMovies} from "../../reducers";
import {removeMovie, addMovie} from "../../actions";
import {Interval} from "luxon/src/interval.js";
import {Duration} from "luxon/src/duration.js";
import {DateTime} from "luxon/src/datetime.js";

import {connect} from "react-redux";

import "../../styles/Schedule.less";

import block from "../../helpers/BEM";

const b = block("Schedule");

class Schedule extends Component {
    constructor(props) {
        super(props);

        const sessionStart = DateTime.fromObject({
            hour: 9,
            minute: 0
        });

        const scheduleInterval = Interval.after(sessionStart, {hours: 16});

        this.scale = (t) => 100 * t / scheduleInterval.toDuration().milliseconds;

        this.state = {
            startTime: sessionStart,
            session: scheduleInterval.splitBy({minutes: 60})
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
                            <div  style={{height: film.schedule.length * 10}} key={"div-2lev" + i.toString()} className={b("film-schedule")}>
                                {film.schedule.map((s, i) => (
                                    <div key={i} className={b("film-schedule-item")}
                                          style={{
                                              top: i * 10,
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
        console.log(movies);
        return {
            films: movies.map(movie => ({
                name: movie.name,
                schedule: movie.Schedule.map(start =>
                    Interval.after(DateTime.fromFormat(start, "HH:mm"), {
                        hour: movie.duration.hour,
                        minute: movie.duration.minute
                    })
                ),
                id: movie.id
            }))
        };
    },
    mapDispatchToProps
)(Schedule);
