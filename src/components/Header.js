import React, {Component} from "react";
import "../styles/Header.less";
import block from "../helpers/BEM";
const b = block("Header");

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={b()}>
            <a href={'#'} className={b('tab', ['active'])}>Home</a>
            <a href={'#'} className={b('tab')}>Schedule</a>
            <a href={'#'} className={b('tab')}>Movies</a>
            <input className={b('search')} placeholder={'Search'}/>
            <a href={'#'} className={b('icon')}></a>
        </div>;
    }
}

export default Header;
