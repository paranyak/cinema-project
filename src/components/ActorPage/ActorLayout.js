import React, {Component} from 'react'

import "../../styles/Actors.less";
import block from "../../helpers/BEM";
import {connect} from "react-redux";


const b = block("Actor-Layout");


class ActorLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {actor} = this.props;
        if (!actor) {
            return null;
        }
        return  (
            <h1>{actor}</h1>
        );
    }
}

export default connect((state, props) => {
        console.log("CONNECT", props.match.params.id);
        return {actor: props.match.params.id};
    }
)(ActorLayout);