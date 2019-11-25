import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

/* Export PrivateRoutes. If user is to navigate to this route and not logged in,
   user will be redirected to a sign in page. */
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to='/signin' />
            )
          }
        />
      )}
    </Consumer>
  );
}
