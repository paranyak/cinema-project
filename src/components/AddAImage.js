import React, {Component} from "react";
import block from "../helpers/BEM";
import "../styles/AddAImage.less";
import DragDropImage from "./DragDropImage";

const b = block("AddAImage");

class AddAImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actor: ''
        };
        this.myCallback2 = this.myCallback2.bind(this);
    }

    myCallback2(name, item) {
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
        return <div className={b()}>
            <h3 className={b('title')}>Actor Image</h3>
            <DragDropImage value={''} name='actor' callbackFromParent={this.myCallback2}
                           callbackInRemove={this.myCallback2}/>
        </div>;
    }
}

export default AddAImage;