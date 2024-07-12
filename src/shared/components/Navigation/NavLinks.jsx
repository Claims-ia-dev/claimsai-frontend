import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = () => {
  const auth = useContext(AuthContext); //to see if the user is logged in
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (auth.userinfo && auth.role === 'user') {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [auth.userinfo, auth.role]);
 

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
      {isUser&&(<li>
        <NavLink to="/workteam" end >
          Work Team
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
