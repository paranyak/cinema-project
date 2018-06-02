import React, {Component} from "react";
import "../styles/Login.scss";
import block from "../helpers/BEM";
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import {loginUser} from '../actions/auth';
import {getAuthError} from '../reducers/index';

const b = block("Login");

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      event.preventDefault();
      const {email, password} = this.state;
      this.props.loginUser(email, password)
    }

    handleChange(event, label) {
      this.setState({
        ...this.state,
        [label]: event.target.value
      });
    }

    render() {
        return <div className={b()}>
          <h1 className={b('header')}>Login</h1>
          <form className={b('form')} onSubmit={this.handleSubmit}>
            <input className={b('input', ['above'])} value={this.state.email} onChange={(event) => this.handleChange(event, 'email')} type="email" name="email" placeholder="E-mail"/>
            <input className={b('input', ['below'])} value={this.state.password} onChange={(event) => this.handleChange(event, 'password')} type="password" name="password" placeholder="Password"/>
            <span style={{display: this.props.error ? 'block' : 'none'}} className={b('message')}>{this.props.error ? this.props.error.message : ''}</span>
            <input className={b('submit')} type="submit" value="Submit"/>
          </form>
          <NavLink to="/signup" className={b('signup')}>Sign up</NavLink>
        </div>;
    }
}


export default connect(
    (state, props) => ({
        error: getAuthError(state)
    }),
    (dispatch) => ({
        loginUser: (email, password) => dispatch(loginUser(email, password))
    })
)(Login);
