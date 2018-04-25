import React, {Component} from "react";
import "../styles/Navigation.less";
import block from "../helpers/BEM";
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import {logoutUser} from '../actions/auth';
import {getCurrentUser} from '../reducers/index';
import {withRouter} from 'react-router-dom';

const b = block("Navigation");

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    signOut() {
      this.props.logoutUser();
    }

    render() {
      let additional = '';
      let role = this.props.user && this.props.user.role;
      if(role === 'admin') {
        additional = (<div>
                        <NavLink to='/add-movie' className={b('add')} activeClassName={b('add', ['active'])}>
                            +
                        </NavLink>

                        <NavLink to='/add-actor' className={b('add', ['actor'])} activeClassName={b('add', ['active'])}>
                            +
                        </NavLink>
                      </div>)
        }


        return <div className={b()}>
            <NavLink to="/" exact className={b('tab')} activeClassName={b('tab', ['active'])}>Home</NavLink>
            <NavLink to="/schedule" className={b('tab')} activeClassName={b('tab', ['active'])}>Schedule</NavLink>
            <NavLink to="/login" style={{display: this.props.user ? 'none' : 'block'}} className={b('tab', ['login'])} activeClassName={b('tab', ['active'])}>Login</NavLink>
            <button className={b('tab', ['logout'])} onClick={() => this.signOut()} style={{display: this.props.user ? 'block' : 'none'}}>Log out</button>
            {additional}
        </div>;
    }
}

export default withRouter(connect(
    (state, props) => ({
      user: getCurrentUser(state)
    }),
    (dispatch) => ({
      logoutUser: () => dispatch(logoutUser())
    })
)(Navigation));
