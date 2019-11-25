import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default class UpdateCourse extends Component {

  // Declare class's states.
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }

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

    const data = this.props.context.data;
    const { authenticatedUser } = this.props.context;
    const courseId = this.props.match.params.id;
    
    course.userId = authenticatedUser.id;

    // Call updateCourse function in HOC to update the course passing the course's body, current user's username and password and current course id.
    data.updateCourse(course, authenticatedUser.username, authenticatedUser.password,
                      courseId)
      .then(errors => {
        if (errors) {
          if (errors.hasOwnProperty('error')) {
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
    const allcourseId = [];
    let currentCourse;

    for (let course of this.props.context.courses) {
      allcourseId.push(course.id);
    };

    if (allcourseId.indexOf(parseInt(this.props.match.params.id)) !== -1) {
      currentCourse = allcourseId.indexOf(parseInt(this.props.match.params.id)) + 1;
    }

    e.preventDefault();
    this.props.history.push(`/courses/${currentCourse}`);
  }

  // A function to loop through all courses and grab the one that has the same as the url params id.
  getCurrentCourse = () => {
    for (let course of this.props.context.courses) {
      if (course.id === parseInt(this.props.match.params.id)) {
        return course;
      }
    }
  }

  // Render page.
  render() {
    return (
      <Consumer>
        {
          context => {
          const data = this.getCurrentCourse();
          const allcourseId = [];
          let titleError;
          let descriptionError;

          // If the params id in the url is more than the courses length, redirects user to "not found" page.
          if (context.courses.length) {
            for (let course of context.courses) {
              allcourseId.push(course.id);
            };

            if (!allcourseId.includes(parseInt(this.props.match.params.id))) {
              return <Redirect to='/notfound' />
            }
          };

          // If there's a title error append it to the page on form submission.
          if (this.state.errors.includes('Please provide a value for "title"')) {
            titleError = <p className="error-message">Please make some changes in "Title" field. If you wish to make no changes, please click the "Cancel" button.</p>;
          }

          // If there's a description error append it to the page on form submission.
          if (this.state.errors.includes('Please provide a value for "description"')) {
            descriptionError = <p className="error-message">Please make some changes in "Description" field. If you wish to make no changes, please click the "Cancel" button.</p>;
          }

          if (data) {
            // If authenticated's userId is inequal to the current course's userId, redirects user to "forbidden page".
            if (context.authenticatedUser.id !== data.userId) {
              return (<Redirect to='/forbidden' />)
            } else {
              // If authenticated's userId is equal to the current course's userId, renders the page.
              return (
                <div className="bounds course--detail">
                  <h1>Update Course</h1>
                  <div>
                    <form onSubmit={this.handleSubmit}>
                      <div className="grid-66">
                        <div className="course--header">
                          <h4 className="course--label">Course</h4>
                          <div>
                            {titleError ? titleError : null}
                            <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={data.title} onChange={this.handleChange}/>
                          </div>
                          <p>{`By ${data.User.firstName} ${data.User.lastName}`}</p>
                        </div>
                        <div className="course--description">
                          <div>
                            {descriptionError ? descriptionError : null}
                            <textarea id="description" name="description" className="" placeholder="Course description..."  defaultValue={data.description} onChange={this.handleChange}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="grid-25 grid-right">
                        <div className="course--stats">
                          <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                              <h4>Estimated Time</h4>
                              <div>
                                <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={data.estimatedTime} onChange={this.handleChange}/>
                              </div>
                            </li>
                            <li className="course--stats--list--item">
                              <h4>Materials Needed</h4>
                              <div>
                                <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." defaultValue={data.materialsNeeded} onChange={this.handleChange}></textarea>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Update Course</button>
                        <button className="button button-secondary" onClick={this.onCancel}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              );
            }
          }
        }}
      </Consumer>
    )
  }
}
