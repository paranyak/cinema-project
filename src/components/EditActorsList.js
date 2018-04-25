import React, {Component} from "react";
import "../styles/EditActorsList.less";
import block from '../helpers/BEM'

const b = block("EditActorsList");

class EditActorsList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={b()}>EditActorsList</div>;
    }
}

export default EditActorsList;