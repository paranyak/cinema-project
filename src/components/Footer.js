import React, {Component} from "react";
import "../styles/Footer.less";
import block from "../helpers/BEM";

const b = block("Footer");

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={b()}>
            Footer
        </div>;
    }
}

export default Footer;
