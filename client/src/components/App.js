import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import { LastLocationProvider } from 'react-router-last-location';
import { Provider } from './Context';

// Import Components
import Header from './Header';
import Courses from './Courses';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import CourseDetail from './CourseDetail';
import DeleteCourse from './DeleteCourse';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';
import UserSignOut from './UserSignOut';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';
import Forbidden from './Forbidden';
import UnhandledError from './UnhandledError';
import withContext from './Context';

/* Create components that wraps in HOC so that all these components can have access
   to the main props without having to pass each one down from another to another. */
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const DeleteCourseWithContext = withContext(DeleteCourse);

export default class App extends Component {

  render() {
    // Create Hr Element
    const Hr = () => (<hr/>);

    /* Create a div container named "RoutesContainer" which uses to wrap all defined
       routes to animate each in and out when the route changes. */
    const RoutesContainer = posed.div({
      enter: { opacity: 1 , delay: 400 },
      exit: { opacity: 0, y: 50 }
    })

    // Declare all routes and components
    return (
      <Provider>
        <LastLocationProvider>
          <div>
            <HeaderWithContext />
            <Hr />
            <div className="bounds">
              <Route render={({ location }) => (
                <PoseGroup className="pose-container">
                  <RoutesContainer key={location.pathname}>
                    <Switch location={location}>
                      <Route exact path='/' component={ CoursesWithContext } />
                      <PrivateRoute exact path='/courses/create' component={ CreateCourseWithContext } />
                      <PrivateRoute exact path='/courses/:id/update' component={ UpdateCourseWithContext } />
                      <PrivateRoute exact path='/courses/:id/delete' component={ DeleteCourseWithContext } />
                      <Route exact path='/courses/:id' component={ CourseDetail } />
                      <Route path='/signin' component={ UserSignInWithContext } />
                      <Route path='/signup' component={ UserSignUpWithContext } />
                      <Route path='/signout' component={ UserSignOutWithContext } />
                      <Route path='/notfound' component={ NotFound } />
                      <Route path='/forbidden' component={ Forbidden } />
                      <Route path='/error' component={ UnhandledError } />
                      <Route component={ NotFound } />
                    </Switch>
                  </RoutesContainer>
                </PoseGroup>
              )} />
            </div>
          </div>
        </LastLocationProvider>
      </Provider>
    );
  }
};
