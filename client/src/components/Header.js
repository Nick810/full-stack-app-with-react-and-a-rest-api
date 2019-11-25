import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ context }) => {
  const { authenticatedUser } = context;

  /* Render page. If user is logged in, change sign up link to welcome current user and change
     sign in link to sign out. */
  return (
    <div className="header">
       <div className="bound">
         <h1 className="header--logo">Courses</h1>
         <nav>
           { authenticatedUser ?
             <span>{`Welcome, ${authenticatedUser.firstName}`}</span>
             :
             <Link className="singup" to="/signup">Sign Up</Link>
           }
           { authenticatedUser ?
             <Link className="singout" to="/signout">Sign Out</Link>
             :
             <Link className="singin" to="/signin">Sign In</Link>
           }
         </nav>
       </div>
     </div>
  )
}

export default Header;
