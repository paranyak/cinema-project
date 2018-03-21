import React, {Component} from 'react'
import {Link} from 'react-router-dom'


import "../../styles/Actors.less";
import block from "../../helpers/BEM";

const b = block("Actors");


class Actors extends Component {
    render() {
        const {film} = this.props;
        return (
            <section className={b()}>
                {film.cast.map((actor, ind) => <div className={b("item")} key={ind}>
                    <Link className={b("actor-link")} key={ind} to={`/actor/${actor.name}`}>
                        <img className={b("image")} src={actor.image}/></Link>
                    <p className={b("name")}>{actor.name}</p>
                    <p className={b("separator")}>as...</p>
                    <p className={b("role")}>{actor.role}</p>
                </div>)}
            </section>
        )
    }
}

export default Actors
