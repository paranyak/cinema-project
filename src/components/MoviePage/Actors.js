import React, {Component} from 'react'

import "../../styles/Actors.less";
import block from "../../helpers/BEM";

const b = block("Actors");

//todo: change actors structure in data
// actor + photo + role in movie

class Actors extends Component {
    render() {
        const {film} = this.props;
        return (
            <div className={b()}>
                {film.cast.map((actor, ind) => <p className={b("item")} key={ind}>{actor}</p>)}
            </div>
        )
    }
}

export default Actors
