import React, { Component } from 'react';
import { useLastLocation } from 'react-router-last-location';
import Data from '../Data';
import Cookies from 'js-cookie';

// Create React Context.
const CoursesContext = React.createContext();

export class Provider extends Component {

  // Declare class state.
  state = {
    data: new Data(),
    courses: [],
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    error: null
  };

  // When the component mounts, call "getCourses" function.
  componentDidMount() {
    this.getCourses('http://localhost:5000/api/courses');
  }

  // A function to fetch courses from database. If there's an error, create an error div.
  getCourses = async(url) => {
    try {
      return await fetch(url)
        .then(res => res.json())
        .then(res => this.setState({ courses: res }));
    } catch (error) {
      this.setState({ error:
        <div className="bounds error-container">
          <h1>An Error Has Occurred</h1>
          <p>Sorry! An unexpected error has occurred.</p>
        </div>
      });
    }
  }

  // A function to sign in a user.
  signIn = async (username, password) => {
    let user = await this.state.data.getUser(username, password);
    if (user !== null) {
      user.username = username;
      user.password = password
      this.setState({ authenticatedUser: user });
      return Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }

    return user;
  }

  // A function to sign out a user.
  signOut = () => {
    this.setState({authenticatedUser: ''});
    return Cookies.remove('authenticatedUser');
  };

  // Render HOC.
  render() {
    const { authenticatedUser } = this.state;
    const value = {
      data: this.state.data,
      courses: this.state.courses,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        getCourses: this.getCourses
      },
      authenticatedUser,
    }

    return (
      <CoursesContext.Provider value={value}>
        {this.props.children}
        {this.state.error ? this.state.error : null}
      </CoursesContext.Provider>
    )
  }
}

// Export Consumer to be used with other components that need to access main props.
export const Consumer = CoursesContext.Consumer;

/* Export function for using with other class components that need to acces main props.
   Also pass the use location to the function as well so that the component that is attached
   to this HOC will have always have an access to the previous pathname. */
export default function withContext(Component) {
  return function ContextComponent(props) {
    const lastLocation = useLastLocation();
    return (
      <CoursesContext.Consumer>
        {context => <Component {...props} context={context} prevPath={lastLocation} />}
      </CoursesContext.Consumer>
    );
  }
}
