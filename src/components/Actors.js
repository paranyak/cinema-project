import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {fetchActorsSlug} from '../actions/actors';
import "../styles/Actors.scss";
import block from "../helpers/BEM";
import {getActorBySlug} from "../reducers";

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
            <div className={b("item")} style={{display: actor.published ? '' : 'none'}}>
                <Link className={b("actor-link")} to={`/actor/${actor.slugName}`}>
                    <img alt="" className={b("image")} src={link + actor.image}/>
                </Link>
                <p className={b("name")}>
                    {actor.name}
                </p>
            </div>
        )
    }
}

export default connect((state, props) => {
        const actor = getActorBySlug(props.id, state);
        return {actor};
    }, (dispatch) => ({
        fetchActorById: (id) => dispatch(fetchActorsSlug(id))
    })
)(Actors);
