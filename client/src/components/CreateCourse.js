import React, { Component } from 'react';
import { Consumer } from './Context';

export default class CreateCourse extends Component {

  // Declare class's state.
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  };

  // A function to handle form submission.
  handleSubmit = e => {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    let course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    }

    course.userId = this.props.context.authenticatedUser.id;
    const data = this.props.context.data;
    const { authenticatedUser } = this.props.context;

    // Call createCourse function from HOC passing course as the body, current user's username and password.
    data.createCourse(course, authenticatedUser.username, authenticatedUser.password)
      .then(errors => {
        if (errors) {
          if (errors.hasOwnProperty('message')) {
            this.props.history.push('/forbidden');
          } else if (errors.hasOwnProperty('error')) {
            if (!errors.error.message) {
              this.props.history.push('/error');
            } else {
              this.setState({ errors: errors.error.message });
            }
          }
        } else {
          this.props.history.push('/');
        }
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
  onCancel = e => {
    e.preventDefault();
    this.props.history.push('/');
  }

  //  Render page.
  render() {
    return (
      <Consumer>
        { context => {
          const data = context.courses;
          const { authenticatedUser } = context;
          let titleError;
          let descriptionError;

          // If there's a title error append it to the page on form submission.
          if (this.state.errors.includes('Please provide a value for "title"')) {
            titleError = <p className="error-message">The "Title" field must not be blank.</p>;
          }

            // If there's a description error append it to the page on form submission.
          if (this.state.errors.includes('Please provide a value for "description"')) {
            descriptionError = <p className="error-message">The "Description" field must not be blank.</p>;
          }

          if (data) {
            return (
              <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="grid-66">
                      <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div>
                          {titleError ? titleError : null}
                          <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={this.state.title} onChange={this.handleChange}/>
                        </div>
                        <p>{`By ${authenticatedUser.firstName} ${authenticatedUser.lastName}`}</p>
                      </div>
                      <div className="course--description">
                        <div>
                          {descriptionError ? descriptionError : null}
                          <textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.description} onChange={this.handleChange}></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="grid-25 grid-right">
                      <div className="course--stats">
                        <ul className="course--stats--list">
                          <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div>
                              <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={this.state.estimatedTime} onChange={this.handleChange}/>
                            </div>
                          </li>
                          <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div>
                              <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded} onChange={this.handleChange}></textarea>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                      <button className="button" type="submit">Create Course</button>
                      <button className="button button-secondary" onClick={this.onCancel}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            );
          }
        }}
      </Consumer>
    )
  }
};
