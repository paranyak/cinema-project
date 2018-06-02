import React, {Component} from "react";
import "../styles/ActorPoster.scss";
import block from "../helpers/BEM";
import {connect} from "react-redux";
import {getActorBySlug} from "../reducers";
import {fetchActorsSlug} from '../actions/actors';

const b = block("ActorPoster");
const link = 'https://res.cloudinary.com/dtnnkdylh/image/upload/w_200,h_200,c_thumb,g_face/';

class ActorPoster extends Component {
    render() {
        const {actor, actorSlug} = this.props;
        if (!actor || actor === undefined) {
            this.props.fetchActorBySlug(actorSlug);
            return null;
        }
        let image;
        if (actor.image) {
          image = (<picture>
              <img src={link + actor.image} className={b("image")}/>
          </picture>)
        } else {
          image = (<span className={b("image", ["undefined"])}></span>)
        }
        return (
            <article className={b()}>
                {image}
                <footer className={b("additional-info")}>
                    <h3 className={b('name')}>
                        {actor.name}
                    </h3>
                </footer>
            </article>
        )
    }
}

export default connect((state, props) => {
        const actor = getActorBySlug(props.actorSlug, state);
        return {actor}
    },
    (dispatch) => ({fetchActorBySlug: (slug) => dispatch(fetchActorsSlug(slug))})
)(ActorPoster);
