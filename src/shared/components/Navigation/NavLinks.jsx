import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = () => {
  const auth = useContext(AuthContext); //to see if the user is logged in

  return (
    <ul className="nav-links"> 
      <li>
        <NavLink to="/manageSubscription" end >
          Manage my subscription
        </NavLink>
      </li>      
      <li>
        <NavLink to="/subscription" end >
          Subscription Plan
        </NavLink>
      </li>
   
      
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/claims/newCustomer">Add estimate</NavLink>
        </li>
      )}      
    
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Log out</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
