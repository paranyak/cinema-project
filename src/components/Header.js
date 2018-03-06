import React, {Component} from "react";
import "../styles/Header.less";
import block from "../helpers/BEM";
import { NavLink } from 'react-router-dom'
const b = block("Header");

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={b()}>
            <NavLink to="/" exact className={b('tab')} activeClassName={b('tab', ['active'])}>Home</NavLink>
            <NavLink to="/schedule" className={b('tab')} activeClassName={b('tab', ['active'])}>Schedule</NavLink>
            <input className={b('search')} placeholder={'Search'}/>
            <a href={'#'} className={b('icon')}></a>
        </div>;
    }
}

export default Header;
