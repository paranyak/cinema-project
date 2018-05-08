import React, {Component} from "react";
import "../styles/ActorPoster.less";
import block from "../helpers/BEM";
import {connect} from "react-redux";
import {getActorById} from "../reducers";
import {fetchActors} from '../actions/fetch';
import {Link} from "react-router-dom";

const b = block("ActorPoster");
const link = 'https://res.cloudinary.com/dtnnkdylh/image/upload/w_200,h_200,c_thumb,g_face/';

class ActorPoster extends Component {
    render() {
        const {actor, actorId} = this.props;
        if (!actor || actor === undefined) {
            this.props.fetchActorById(actorId);
            return null;
        }
        return (
            <article className={b()}>
                <Link key={actor} to={`/actor/${actor.slugName}`}>
                    <picture>
                        <img src={link + actor.image} className={b("image")}/>
                    </picture>
                    <footer className={b("additional-info")}>
                        <h3 className={b('name')}>
                            {actor.name}
                        </h3>
                    </footer>
                </Link>
            </article>
        )
    }
}

export default connect((state, props) => {
        const actor = getActorById(state, props.actorId);
        return {...props, actor}
    },
    (dispatch) => ({fetchActorById: (id) => dispatch(fetchActors(id))})
)(ActorPoster);
