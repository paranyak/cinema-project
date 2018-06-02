import React, {Component} from "react";
import {getAllFilters} from "../reducers/index";
import {changeDate} from "../actions/filter";
import {Interval} from "luxon/src/interval.js";
import {Link} from 'react-router-dom'
import {DateTime} from "luxon/src/datetime.js";
import ReactTooltip from 'react-tooltip';
import {push} from 'react-router-redux';
import {connect} from "react-redux";
import "../styles/Schedule.scss";
import block from "../helpers/BEM";
import {fetchMovieSlug} from '../actions/movies';
import {getAllMoviesSlugs, getMovieBySlug, isMovieFetchingSlug} from "../reducers";


const b = block("Schedule");

class Schedule extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {films, onDateChange, date} = this.props;
        let unfetched = this.props.unfetchedMovies;
        unfetched
            .filter(slug => !this.props.isMovieFetching(slug))
            .forEach(slug => this.props.fetchMovieBySlug(slug));
        const sessionStart = date.set({
            hour: 9,
            minute: 0,
            seconds: 0,
            milliseconds: 0
        });

        const scheduleInterval = Interval.after(sessionStart, {hours: 16});
        this.scale = (t) => 100 * t / scheduleInterval.toDuration().milliseconds;
        this.globalScale = (t) => 85 * t / scheduleInterval.toDuration().milliseconds + 15;
        const session = scheduleInterval.splitBy({minutes: 60});

        //GET TODAY DATE
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;
        //GET TODAY DATE ^
        return (
            <section className={b()}>
                <header className={b("header")}>
                    <time className={b("day-container")}>
                        <input className={b("day")} type="date" value={date.toFormat('yyyy-MM-dd')}
                               onChange={onDateChange} min={today}/>
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
                              display: (sessionStart.hasSame(DateTime.local(), 'day')) && (films.length > 0) ? 'block' : 'none'
                          }}/>
                    <span className={b("films-placeholder")}
                          style={{display: films.length === 0 ? 'block' : 'none'}}>
                    Sorry, there are no movies for today</span>
                    {films.map((film, i) => (
                        <article key={"div-1lev" + i.toString()} className={b("film")}>
                          <span key={i} className={b("film-name")}>
                              <Link className={b("film-link")} key={film.id} to={`/movie/${film.slugName}`}>
                                {film.name}
                                </Link>
                          </span>
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
            dispatch(changeDate(event.target.value));
            dispatch(push('/schedule/' + event.target.value));
        },
        fetchMovieBySlug: (slug) => dispatch(fetchMovieSlug(slug))
    }
};

export default connect((state, props) => {
        const moviesSlugs = getAllMoviesSlugs(state);
        const unfetchedMovies = [];
        const movies = moviesSlugs.map((slug) => {
            let movie = getMovieBySlug(slug, state);
            if (!movie) {
                unfetchedMovies.push(slug);
            }
            return movie;
        }).filter(movie => movie);
        const filters = getAllFilters(state);
        const date = filters.date ?
            DateTime.fromFormat(filters.date, 'yyyy-MM-dd') :
            DateTime.local();
        return {
            date,
            unfetchedMovies,
            isMovieFetching: (slug) => isMovieFetchingSlug(slug, state),
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
                    slugName: movie.slugName
                }))
                .filter(movie => movie.schedule.length !== 0)
        };
    },
    mapDispatchToProps
)(Schedule);
