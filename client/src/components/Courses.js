import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

export default class Courses extends Component {
  // When the component mounts, call getCourses function in HOC.
  async componentDidMount() {
    return await this.props.context.actions.getCourses('http://localhost:5000/api/courses');
  }

  render() {
    let courses = null;

    // Create a div named "Box" which animates scale and box-shadow on hover.
    const Box = posed.div({
      hoverable: true,
      init: {
        scale: 1,
        boxShadow: '0px 0px 0px rgba(0,0,0,0.2)'
      },
      hover: {
        scale: 1.050,
        boxShadow: '0px 5px 10px rgba(0,0,0,0.4)'
      },
    });

    /* Create a new array from courses database and append each course to a new array in variable "courses"
       after looping through all courses and "Create new course" div and append to variable "course". */
    if (this.props.context.courses.length) {
      courses = this.props.context.courses.map((course, index) =>
        <div key={index + 1} className="grid-33">
          <Box className="courses-box">
            <Link className="course--module course--link" to={`courses/${index + 1}`}>
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          </Box>
        </div>
      );
      courses.push(
        <div key={courses.length + 1} className="grid-33">
          <Box className="courses-box">
            <Link className="course--module course--add--module" to="/courses/create">
              <h3 className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                New Course
              </h3>
            </Link>
          </Box>
        </div>
      )
    }

    // Render page 
    return courses;
  }
}
