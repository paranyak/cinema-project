import React, {Component} from "react";
import "../../styles/header.less";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={"header"}>Header</div>;
    }
}

export default Header;