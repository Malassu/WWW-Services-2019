import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { authActions } from '../actions';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoggedOutNav from './LoggedOutNav';

class SignupForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  onSubmit = e => {
    e.preventDefault();
    try {
      this.props.signup(this.state.username, this.state.password)
        .then(() => {
          this.props.history.push('/home')
        })
    } catch (error) {
      console.log("Error", error)
    }
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
            <Col xs={12} md={{ span: 6, offset: 3 }}>
              <form onSubmit={this.onSubmit} className="signup-form">
                <h1>Create <br />Account</h1>
                <p>Already have an account? <br /><Link to='/login'>Sign in.</Link></p>
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
                <input type="submit" value="Sign up" />
              </form>
              <div>
                {this.props.errors.length > 0 && (
                  <ul className="errors">
                    {this.props.errors.filter(error =>
                      error.message !== 'Authentication credentials were not provided.' && error.message !== 'Error decoding signature.'
                    ).map(error => (
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
    errors: errors,
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signup: (username, password) => {
      return dispatch(authActions.signup(username, password));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupForm));
