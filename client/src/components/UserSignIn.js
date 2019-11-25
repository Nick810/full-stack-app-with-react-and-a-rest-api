import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserSignIn extends Component {

  // Declare class's states.
  state = {
    emailAddress: '',
    password: '',
    errors: '',
  };

  // A function to handle form submission.
  handleSubmit = e => {
    const data = this.props.context;
    const path = this.props.prevPath ? this.props.prevPath.pathname : '/';
    const { emailAddress, password } = this.state;

    // Call Signin function in HOC to signin user passing email address and password.
    data.actions.signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          this.setState({ errors: 'Access denied, either username or password is incorrect.'})
        } else {
          if (path === '/signup' || path === '/error' || path === 'forbidden') {
            this.props.history.push('/');
          } else {
            this.props.history.push(path);
          }
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });

    e.preventDefault();
  }

  // A function to change class's state according user's input.
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    })
  };

  // A function to handle cancel button click. This will take the user back to this course detail.
  handleCancel = e => {
    e.preventDefault();
    this.props.history.push('/');
  }

  // Render page.
  render() {
    let logInError;

      // If username or password or neither is correct, shows an error.
    if (this.state.errors) {
      logInError = <p className="error-message">{`${this.state.errors}`}</p>
    }
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              {logInError ? logInError : null}
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleChange}/>
              </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleChange}/>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    )
  }
}
