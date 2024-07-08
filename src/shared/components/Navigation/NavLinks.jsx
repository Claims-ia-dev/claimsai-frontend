import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = () => {
  const auth = useContext(AuthContext); //to see if the user is logged in
  const usuario=auth.userinfo?.user_type?auth.userinfo.user_type:'guest';
  let isUser=false;
  if (usuario==="user"){
    isUser=true;
  }

  return (
    <ul className="nav-links"> 
     {isUser&&(<li>
        <NavLink to="/manageSubscription" end >
          Manage my subscription
        </NavLink>
      </li>)}     
      {isUser&&(<li>
        <NavLink to="/subscription" end >
          Subscription Plan
        </NavLink>
      </li> )}
   
      
      {auth.isLoggedIn && isUser && (
        <li>
          <NavLink to="/claims/newCustomer">Add estimate</NavLink>
        </li>
      )}      
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/change-password">Change password</NavLink>
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
