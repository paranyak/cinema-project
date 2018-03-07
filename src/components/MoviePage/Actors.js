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
                {film.cast.map((actor, ind) => <div className={b("item")} key={ind}>
                    <img className={b("image")} src={actor.image}/>
                    <p className={b("name")}>{actor.name}</p>
                    <p className={b("separator")}>as...</p>
                    <p className={b("role")}>{actor.role}</p>
                </div>)}
            </div>
        )
    }
}

export default Actors
