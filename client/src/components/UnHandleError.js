import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="bounds unhandle-error">
    <h1>An Error Has Occurred</h1>
    <p>Sorry! An unexpected error has occurred.</p>
    <Link className="return-link" to="/">Return to Home</Link>
  </div>
)
