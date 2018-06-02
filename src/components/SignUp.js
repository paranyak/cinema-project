import React, {Component} from "react";
import "../styles/SignUp.scss";
import block from "../helpers/BEM";
import {NavLink} from 'react-router-dom';
import {signUpUser} from '../actions/auth';
import {connect} from "react-redux";
import {getAuthError} from '../reducers/index';


const b = block("SignUp");

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          surname: '',
          email: '',
          password1: '',
          password2: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      event.preventDefault();
      const {email, password1, password2} = this.state;
      if (password1 === password2) {
        this.props.signUpUser(email, password1)
      }
    }

    handleChange(event, label) {
      this.setState({
        ...this.state,
        [label]: event.target.value
      });
    }

    render() {
        return <div className={b()}>
          <h1 className={b('header')}>Sign up</h1>
          <form className={b('form')} onSubmit={this.handleSubmit}>
            <input className={b('input', ['above'])} value={this.state.name} onChange={(event) => this.handleChange(event, 'name')} type="text" name="name" placeholder="Name"/>
            <input className={b('input', ['below'])} value={this.state.surname} onChange={(event) => this.handleChange(event, 'surname')} type="text" name="surname" placeholder="Surname"/>
            <input className={b('input', ['above'])} value={this.state.email} onChange={(event) => this.handleChange(event, 'email')} type="email" name="email" placeholder="E-mail"/>
            <input className={b('input')} value={this.state.password1} onChange={(event) => this.handleChange(event, 'password1')} type="password" name="password" placeholder="Password"/>
            <input className={b('input', ['below'])} value={this.state.password2} onChange={(event) => this.handleChange(event, 'password2')} type="password" name="confirm-password" placeholder="Confirm password"/>
            <span style={{display: this.props.error ? 'block' : 'none'}} className={b('message')}>{this.props.error ? this.props.error.message : ''}</span>
            <input className={b('submit')} type="submit" value="Submit"/>
          </form>
          <NavLink to="/login" className={b('signup')}>Login</NavLink>
        </div>;
    }
}

export default connect(
    (state, props) => ({
      error: getAuthError(state)
    }),
    (dispatch) => ({
      signUpUser: (email, password) => dispatch(signUpUser(email, password))
    })
)(SignUp);
