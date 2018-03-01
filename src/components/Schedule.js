import React, { Component } from "react";
import { getAllMovies } from "../reducers";

import { Interval } from "luxon/src/interval.js";
import { Duration } from "luxon/src/duration.js";
import { DateTime } from "luxon/src/datetime.js";

import { connect } from "react-redux";

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

    const scheduleInterval = Interval.after(sessionStart, { hours: 16 });

    this.scale = (t) => 100 * t/ scheduleInterval.toDuration().milliseconds ;

    this.state = {
      startTime: sessionStart,
      session: scheduleInterval.splitBy({ minutes: 30 })
    };
  }

  render() {
    const { session, startTime } = this.state;
    const { films } = this.props;
    return (
      <div className={b()}>
        <div className={b("header")}>
          <div className={b("day")}>
            DAY: {startTime.toFormat("yyyy LLL dd")}
          </div>
          <div className={b("time-string")}>
            {session.map(time => (
              <span className={b("time-item")}>
                {time.start.toFormat("HH:mm")}
              </span>
            ))}
          </div>
        </div>

        <div className={b("film-list")}>
          {films.map(film => (
            <div className={b("film")}>
              <span className={b("film-name")}>{film.name}</span>
              <div className={b("film-schedule")}>
                {film.schedule.map( (s, i) => (
                  <span className={b("film-schedule-item")}
                        style={{
                          top: i * 7,
                          width: this.scale (s.toDuration().milliseconds) + "%",
                          left: this.scale (
                            Interval.fromDateTimes (
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
      )
    }))
  };
})(Schedule);
