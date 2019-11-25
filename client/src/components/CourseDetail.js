import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, Route, useParams } from 'react-router-dom';
import { Consumer } from './Context';
import NotFound from './NotFound';

const CourseDetail = () => {
  let { id } = useParams();

  return (
    <Consumer>
      { context => {
        const data = context.courses[id - 1];

        // If the params id in the url is more than the courses length, redirects user to "not found" page.
        if (parseInt(id) > context.courses.length) {
          return <Route component={ NotFound } />
        }

        if (data) {
          const courseId = data.id;
          const description = data.description;
          let updateCourse;
          let deleteCourse;
          let estimatedTime;
          let materialsNeeded;

          // if the current user isn't equal to null. if current user's id matches the userId of current course, show Update and Delete button.
          if (context.authenticatedUser !== null) {
            if (context.authenticatedUser.id === data.userId) {
              updateCourse = <Link className="button" to={`/courses/${courseId}/update`}>Update Course</Link>
              deleteCourse = <Link className="button" to={`/courses/${courseId}/delete`}>Delete Course</Link>
            }
          }

          // if there's an estimatedTime data, append it to the page.
          if (data.estimatedTime) {
            const estimatedTimeStr = `<h3>${data.estimatedTime}</h3>`;

            estimatedTime =
            <li className="course--stats--list--item">
              <h4>Estimated Time</h4>
              <ReactMarkdown source={estimatedTimeStr} escapeHtml={false} />
            </li>
          }

          // if there's an materialsNeeded data, append it to the page.
          if (data.materialsNeeded) {
            const materialsNeededStr = data.materialsNeeded;

            materialsNeeded =
            <li className="course--stats--list--item">
              <h4>Materials Needed</h4>
              <ul>
                <ReactMarkdown source={materialsNeededStr} />
              </ul>
            </li>
          }

          // Render the page.
          return (
            <div>
              <div className="actions--bar">
                <div className="bounds">
                  <span>
                    { updateCourse ? updateCourse : null }
                    { deleteCourse ? deleteCourse : null }
                    <Link className="button button-secondary" to="/">Return to List</Link>
                  </span>
                </div>
              </div>
              <div className="bounds course--detail">
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{data.title}</h3>
                    <p>{`By ${data.User.firstName} ${data.User.lastName}`}</p>
                  </div>
                  <div className="course--description">
                    <ReactMarkdown source={description} />
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      { estimatedTime ? estimatedTime : null }
                      { materialsNeeded ? materialsNeeded : null }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }}
    </Consumer>
  )
};

export default CourseDetail;
