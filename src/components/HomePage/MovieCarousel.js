import React, {Component} from "react";
import "../../styles/MovieCarousel.less";
import block from "../../helpers/BEM";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import MoviePoster from "./MoviePoster";

const b = block("MovieCarousel");

class MovieCarousel extends Component {
    render() {
        const {label, films} = this.props;
        return (
            <div className={b()}>
                <button className={b('button')}>
                    <span className={b('icon', ['left'])}></span>
                </button>
                <div className={b('movies')}>
                    {films
                        .filter(film => film.label === label)
                        .map(film =>
                            <Link key={film.id} to={`/movie/${film.id}`}>
                                <MoviePoster film={film}/>
                            </Link>
                        )}
                </div>
                <button className={b('button')}>
                    <span className={b('icon', ['right'])}></span>
                </button>
            </div>
        )
    }
}

export default connect()(MovieCarousel);