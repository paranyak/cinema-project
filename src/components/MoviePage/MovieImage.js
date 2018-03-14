import React, {Component} from "react";

import "../../styles/MovieImage.less";
import block from "../../helpers/BEM";

const b = block("MovieImage");


class MovieImage extends Component {

    render() {

        const {film} = this.props;
        return (
            <section className={b()}>
                <img src={film.image} className={b("main")}/>
                <section className={b("screenshots")}>
                    {film.screenshots.
                    map((screen, ind) => <img src={screen} key={ind} className={b("screen")}/>)}
                </section>
            </section>
        )
    }
}

export default MovieImage