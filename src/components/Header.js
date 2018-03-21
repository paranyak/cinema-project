import React, {Component} from "react";
import "../styles/Header.less";
import block from "../helpers/BEM";
import {NavLink} from 'react-router-dom';

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
            <NavLink to='/add-movie' className={b('add')} activeClassName={b('add', ['active'])}>
                +
            </NavLink>
        </div>;
    }
}

export default Header;
