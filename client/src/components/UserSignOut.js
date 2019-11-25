import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class UserSingOut extends Component {
  // When the component mounts call signOut function from HOC.
  componentDidMount() {
    this.props.context.actions.signOut();
  }

  // Redirects user to home page.
  render() {
    return <Redirect to='/' />
  }
}
