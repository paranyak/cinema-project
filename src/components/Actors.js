import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";

import {getActorById} from "../reducers/index";
import {fetchActors} from '../actions/fetch';

import "../styles/Actors.less";
import block from "../helpers/BEM";

const b = block("Actors");
const link = 'https://res.cloudinary.com/dtnnkdylh/image/upload/w_50,h_50,c_thumb,g_face/';

class Actors extends Component {
    render() {
        const {actor} = this.props;
        if (!actor || actor.slugName === undefined) {
            this.props.fetchActorById(this.props.id);
            return null;
        }
        return (
            <div className={b("item")}>
                <Link className={b("actor-link")} to={`/actor/${actor.slugName}`}>
                    <img className={b("image")} src={link + actor.image}/>
                </Link>
                <p className={b("name")}>
                    {actor.name}
                </p>
            </div>
        )
    }
}

export default connect((state, props) => {
        const actor = getActorById(state, props.id);
        return {actor};
    }, (dispatch) => ({
        fetchActorById: (id) => dispatch(fetchActors(id))
    })
)(Actors);
