import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserSignUp extends Component {

  // Declare class's states.
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    confirmPasswordError: null,
    errors: []
  };

  // A function to handle form submission.
  handleSubmit = e => {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    }

    const { context } = this.props;

    if (user.password === user.confirmPassword) {
      // Call createUser function in HOC to createUser pasisng user variable as a body.
      context.data.createUser(user)
        .then(errors => {
          if (errors) {
            this.setState({ errors: errors.message });
          } else {
            context.actions.signIn(emailAddress, password)
              .then(() => this.props.history.push('/'));
          }
        })
        .catch(err => {
          this.props.history.push('/error')
        })
    } else {
      this.setState({
        errors: [],
        confirmPasswordError: <p className="error-message">Your password and confirm password must match.</p>
      })
    }

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
    let firstNameError;
    let lastNameError;
    let emailAddressError;
    let passwordError;

    // If there's a firstname error append it to the page on form submission.
    if (this.state.errors.includes(`Please provide a value for "firstName"`)) {
      firstNameError = <p className="error-message">Please provide a value for "First Name"</p>
    }

    // If there's a lastname error append it to the page on form submission.
    if (this.state.errors.includes(`Please provide a value for "lastName"`)) {
      lastNameError = <p className="error-message">Please provide a value for "Last Name"</p>
    }

    // If there's an email address error append it to the page on form submission.
    if (this.state.errors.includes(`Please provide a value for "emailAddress"`)) {
      emailAddressError = <p className="error-message">Please provide a value for "Email Address"</p>
    } else if (this.state.errors.includes(`Please use the correct email format (example@email.com)`)) {
      emailAddressError = <p className="error-message">Please use the correct email format (example@email.com)</p>
    }

    // If there's a password error append it to the page on form submission.
    if (this.state.errors.includes(`Please provide a value for "password"`)) {
      passwordError = <p className="error-message">Please provide a value for "Password"</p>
    }

    // Render Page.
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                {firstNameError ? firstNameError : null}
                <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleChange}/>
              </div>
              <div>
                {lastNameError ? lastNameError : null}
                <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.handleChange}/>
              </div>
              <div>
                {emailAddressError ? emailAddressError : null}
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleChange}/>
              </div>
              <div>
                {passwordError ? passwordError : null}
                <input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleChange}/>
              </div>
              <div>
                {this.state.confirmPasswordError ? this.state.confirmPasswordError : null}
                <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.handleChange}/>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    )
  }
}
