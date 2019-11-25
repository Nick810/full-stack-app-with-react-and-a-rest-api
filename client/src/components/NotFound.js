import React from 'react';
import { Link } from 'react-router-dom';

// Export not found Div.
export default () => (
  <div className="bounds not-found">
    <h1>Not Found</h1>
    <p>Sorry! We couldn't find the page you're looking for.</p>
    <Link className="return-link" to="/">Return to Home</Link>
  </div>
);
