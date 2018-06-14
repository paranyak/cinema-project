import React, {Component} from "react";
import "../styles/ImageFields.scss";
import block from '../helpers/BEM'
import DragDropImage from "./DragDropImage";

const b = block("ImageFields");

class ActorImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actor: props.actorImg
        };
        this.getStateFromChild = this.getStateFromChild.bind(this);
    }

    getStateFromChild(name, item) {
        this.setState({[name]: item})
    }

    componentDidMount() {
        const {actor} = this.state;
        this.props.callback(['image'], [actor]);
    }

    componentDidUpdate(prevProps, prevState) {
        const {actor} = this.state;
        if (prevState !== this.state) {
            this.props.callback(['image'], [actor]);
        }
    }

    render() {
        const {actorImg} = this.props;
        return <div className={b()}>
            <h3 className={b('title')}>Actor Image</h3>
            <DragDropImage value={actorImg} name='actor' callbackFromParent={this.getStateFromChild}
                           callbackInRemove={this.getStateFromChild}/>
        </div>;
    }
}

export default ActorImage;