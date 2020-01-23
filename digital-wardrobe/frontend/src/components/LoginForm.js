import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { authActions } from '../actions';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoggedOutNav from './LoggedOutNav';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password)
  }

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/home" />
    }
    return (
      <div>
        <LoggedOutNav />
        <Container>
          <Row>
            <Col >
              <form onSubmit={this.onSubmit} className="login-form" >
                <h1>Log In</h1>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handle_change}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handle_change}
                />
                <input type="submit" value="Login" />
                <p>Don't have an account yet?
                  <br />
                  <Link to='/signup'>Create an account!</Link>
                </p>
              </form>
              <div>
                {this.props.errors.length > 0 && (
                  <ul className="errors">
                    {this.props.errors.map(error => (
                      <li key={error.field}>{error.message}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(authActions.login(username, password));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));