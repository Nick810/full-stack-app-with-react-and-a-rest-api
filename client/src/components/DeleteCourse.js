import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class DeleteCourse extends Component {

  // Declare class's states.
  state = {
    confirmDelete: '',
    errors: []
  }

  // A function to handle form submission.
  handleSubmit = e => {
    let currentCourse;

    // A function to loop through all courses and grab the one that has the same as the url params id.
    for (let course of this.props.context.courses) {
      if (course.id === parseInt(this.props.match.params.id)) {
        currentCourse = course;
      }
    }

    // If password value and confirm password value don't match, show an error.
    if (this.state.confirmDelete !== currentCourse.title) {
      this.setState({
        errors: ['Oops! The course name must match the course title.']
      });
    } else {
      const { authenticatedUser } = this.props.context;

      // Call function in HOC to update the course passing current user's username and password and current course id.
      this.props.context.data.deleteCourse(authenticatedUser.username,
                                           authenticatedUser.password,
                                           currentCourse.id)
        .then(errors => {
          if (errors) {
            if (errors.hasOwnProperty('error')) {
              if (!errors.error.message) {
                this.props.history.push('/error');
              }
            }
          } else {
            this.props.history.push('/')
          }
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
    });
  };

  // A function to handle cancel button click. This will take the user back to this course detail.
  onCancel = e => {
    e.preventDefault();
    this.props.history.push('/');
  }

  //  Render page.
  render() {
    let data;
    let deleteCourse = null;

    // A function to loop through all courses and grab the one that has the same as the url params id.
    for (let course of this.props.context.courses) {
      if (course.id === parseInt(this.props.match.params.id)) {
        data = course;
      }
    }

    if (data) {
      // If authenticated's userId is inequal to the current course's userId, redirects user to "forbidden page".
      if (this.props.context.authenticatedUser.id !== data.userId) {
        return <Redirect to='/forbidden' />
      } else {
      deleteCourse =
        <div className="bounds">
          <h1>Warning!</h1>
          <p>This will delete the <span className="emphasis">{`"${data.title}"`}</span> course. Once it is deleted, it <span className="emphasis">CANNOT</span> be recovered.</p>
          <p>Please type the course title below to confirm the deletion.</p>
          <form onSubmit={this.handleSubmit}>
            <div>
              {this.state.errors ? <p className="error-message">{this.state.errors}</p> : null}
              <input id="confirmDelete" name="confirmDelete" type="text" className="input-confirmDelete course--confirmDelete--input" placeholder="Confirm course title..." onChange={this.handleChange}/>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">DELETE Course</button>
              <button className="button button-secondary" onClick={this.onCancel}>Cancel</button>
            </div>
          </form>
        </div>
      }
    }

    return deleteCourse;
  }
}
