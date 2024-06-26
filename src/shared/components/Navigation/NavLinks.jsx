import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext); //to see if the user is logged in

  return (
    <ul className="nav-links"> 
      <li>
        <NavLink to="/u1/subscription" end >
          Manage my subscription
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/workteam" end >
          My workteam
        </NavLink>
      </li>
      <li>
        <NavLink to="/subscription" end >
          Subscription Plan
        </NavLink>
      </li>
      {auth.isLoggedIn && ( //shows link if the user is logged in
        <li>
          <NavLink to="/u1/claims">My claims</NavLink>
        </li>
      )}
        {auth.isLoggedIn && ( //shows link if the user is logged in
        <li>
          <NavLink to="/u1/projectreceipt">Project receipt</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/claims/newCustomer">Add estimate</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/claims/e1/EstimateCategoryClaims">Category claims</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <button onClick={auth.login}>Log in</button>          
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
