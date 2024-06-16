import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from 'react-router-dom';

import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import PasswordReset from './user/pages/PasswordReset';
import ResetInstructions from './user/pages/ResetInstructions';
import NewClaim from './claims/pages/NewClaim';
import UserClaims from './claims/pages/UserClaims';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element = {<Auth/>}/>   
         
        <Route path="/u1/claims/new" element={<UserClaims />} /> {/*change u1 to :uid */}
        <Route path="/claims/new" element={<NewClaim />} />    
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Auth />}/>             
       
        <Route path="/auth" element={<Auth />}/>

        <Route path="/password-reset" element= {<PasswordReset />}/>
        <Route path="/reset-instructions" element={<ResetInstructions />} />
        <Route path="/claims/new" element={<NewClaim />} />     
       
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
