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
import NewCustomer from './claims/customers/NewCustomer';
import UpdateClaim from './claims/pages/UpdateClaim';
import ChangePassword from './user/pages/ChangePassword';
import WorkTeam from './user/pages/WorkTeam';
import AnswerQuestions from './claims/categoryclaims/pages/AnswerQuestions';
import ProjectReceipt from './claims/pages/ProjectReceipt';
import AutoRenewal from './payment/AutoRenewal';
import Register from './user/pages/Register';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  /**
   * The login function sets the isLoggedIn state to true indicating user has logged in.
   */
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  /**
   * The login function sets the isLoggedIn state to false indicating user has not logged in.
   */
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

   /**
   * If the user is logged in, render the authenticated routes.
   */

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element = {<NewCustomer/>}/>            
        <Route path="/:userId/workteam" element = {<WorkTeam/>}/>            
        <Route path="/:userId/subscription" element = {<AutoRenewal/>}/>            
        <Route path="/:userId/claims/" element={<UserClaims />} /> 
        <Route path="/:userId/projectreceipt/" element={<ProjectReceipt />} /> 
        <Route path="/claims/new" element={<NewClaim />} />
        <Route path="/claims/newCustomer" element={<NewCustomer />} />  
        <Route path="/claims/:estimateId" element={<UpdateClaim />} />  
        <Route path="/claims/:estimateId/EstimateCategoryClaims" element={<AnswerQuestions />} />  
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
     /**
     * If the user is not logged in, render the unauthenticated routes.
     */
    routes = (
      <Routes>
        <Route path="/" element={<Auth />}/>             
       
        <Route path="/auth" element={<Auth />}/>
        <Route path="/register" element={<Register />}/>

        <Route path="/password-reset" element= {<PasswordReset />}/>
        <Route path="/reset-instructions" element={<ResetInstructions />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/claims/new" element={<NewClaim />} />    {/** provisionally here */}  
       
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation  username={'karla'}/>
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
