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
import TestComponent from './shared/util/TestComponent';
import { useAuth } from './shared/hooks/auth-hook';
import SubscriptionPlan from './payment/SubscriptionPlan';
import { ClaimProvider } from './shared/hooks/claim-hook';

const App = () => {

  const { token, login, logout, userId, userinfo } = useAuth();
  console.log("user");
  console.log(userinfo);
  const userrole=userinfo?.user_type;
  


  let routes;

   /**
   * If the user is logged in, render the authenticated routes.
   */

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element = {<NewCustomer/>}/>    
        <Route path="/subscription" element={<SubscriptionPlan />}/>        
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
        <Route path="/subscription" element={<SubscriptionPlan />}/>

        <Route path="/password-reset" element= {<PasswordReset />}/>
        <Route path="/reset-instructions" element={<ResetInstructions />} />
        <Route path="/change-password" element={<ChangePassword />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    
    <AuthContext.Provider
    
    value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      userinfo: userinfo,
      login: login,
      logout: logout
    }}
  ><ClaimProvider>
    <Router>
    {token && <MainNavigation />} {/* Only render MainNavigation if token is present */}

      <main>{routes}</main>
    </Router></ClaimProvider>
  </AuthContext.Provider>
  );
};

export default App;
