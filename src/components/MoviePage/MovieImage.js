import React, {Component} from "react";

import "../../styles/MovieImage.less";

import block from "../../helpers/BEM";

const b = block("MovieImage");


class MovieImage extends Component {
    render() {
        const {film} = this.props;
        return (
            <div className={b()}>
                <img src={film.image} className={b("main")}/>
                <div className={b("screenshots")}>
                    {film.screenshots.
                    map((screen, ind) => <img src={screen} key={ind} className={b("screen")}/>)}
                </div>
            </div>
        )
    }
}

export default MovieImage