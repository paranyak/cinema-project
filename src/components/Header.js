import React, {Component} from "react";
import "../styles/Header.less";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={"Header"}>Header</div>;
    }
}

export default Header;
