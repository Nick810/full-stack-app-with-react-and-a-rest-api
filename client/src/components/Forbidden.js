import React from 'react';
import { Link } from 'react-router-dom';

// Export forbiddin Div.
export default () => (
  <div className="bounds forbidden">
    <h1>Page Forbidden</h1>
    <p>Sorry! You don't have access to the page you requested.</p>
    <Link className="return-link" to="/">Return to Home</Link>
  </div>
)
