import React from 'react';
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
import NewCustomer from './claims/customers/NewCustomer';
import UpdateClaim from './claims/pages/UpdateClaim';
import ChangePassword from './user/pages/ChangePassword';
import WorkTeam from './user/pages/WorkTeam';
import AnswerQuestions from './claims/categoryclaims/pages/AnswerQuestions';
import ProjectReceipt from './claims/pages/ProjectReceipt';
import AutoRenewal from './payment/AutoRenewal';
import Register from './user/pages/Register';
import ChangePasswordLogged from './user/pages/ChangePasswordLogged';
import { useAuth } from './shared/hooks/auth-hook';
import SubscriptionPlan from './payment/SubscriptionPlan';
import { ClaimProvider } from './shared/hooks/claim-hook';
import ValidateEmailReminder from './user/pages/ValidateEmailReminder';
import UpdateAnswers from './claims/categoryclaims/pages/UpdateAnswers';
import { CardProvider } from './shared/context/CardContext';
import AddRoom from './claims/pages/AddRoom';
import AddAnswerQuestions from './claims/categoryclaims/pages/AddAnswerQuestions';
import MyProfile from './user/pages/My Profile';

const App = () => {
  const { token, login, logout, userId, userinfo, role, changeRole } = useAuth();
 // console.log(token);
    
  let routes;

   /**
   * If the user is logged in, render the authenticated routes.
   */

  if (token) {
    if (role==="user"){ //if the user is subscribed 
      routes = (
        <Routes>
          <Route path="/" element = {<NewCustomer/>}/>    
          <Route path="/subscription" element={<SubscriptionPlan />}/>               
          <Route path="/workteam" element = {<WorkTeam/>}/>            
          <Route path="/manageSubscription" element = {<AutoRenewal/>}/>             
          <Route path="/projectreceipt/" element={<ProjectReceipt />} /> 
          <Route path="/claims/new" element={<NewClaim />} />
          <Route path="/claims/newCustomer" element={<NewCustomer />} />  
          <Route path="/claims/:estimateId/rooms/:roomId" element={<UpdateClaim />} />  
          <Route path="/claims/:estimateId/answers/:roomId" element={<UpdateAnswers/>} />  
          <Route path="/claims/EstimateCategoryClaims" element={<AnswerQuestions />} />  
          <Route path="/claims/:estimateId/addroom" element={<AddRoom />} />  
          <Route path="/claims/:estimateId/addroom/CategoryClaims" element={<AddAnswerQuestions/>} />  
          <Route path="/myprofile" element={<MyProfile />}/>
          <Route path="/change-password/" element={<ChangePasswordLogged />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );}
    else if (role==="user-guest"){ //if the user is a team member from another's subscription
      routes = (
        <Routes>
          <Route path="/" element = {<NewCustomer/>}/>               
          <Route path="/projectreceipt/" element={<ProjectReceipt />} /> 
          <Route path="/claims/new" element={<NewClaim />} />
          <Route path="/claims/newCustomer" element={<NewCustomer />} />  
          <Route path="/claims/:estimateId/rooms/:roomId" element={<UpdateClaim />} />  
          <Route path="/claims/:estimateId/answers/:roomId" element={<UpdateAnswers/>} />  
          <Route path="/claims/EstimateCategoryClaims" element={<AnswerQuestions />} />  
          <Route path="/claims/:estimateId/addroom" element={<AddRoom />} />  
          <Route path="/claims/:estimateId/addroom/CategoryClaims" element={<AddAnswerQuestions/>} /> 
          <Route path="/myprofile" element={<MyProfile />}/> 
          <Route path="/change-password/" element={<ChangePasswordLogged />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    }
    else{ routes = ( //if the user hasn't been subscribed
      <Routes>
        <Route path="/" element = {<SubscriptionPlan/>}/>    
        <Route path="/subscription" element={<SubscriptionPlan />}/>  
        <Route path="/myprofile" element={<MyProfile />}/>      
        <Route path="/change-password/" element={<ChangePasswordLogged />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
   
  } else {
     /**
     * If the user is not logged in, render the unauthenticated routes.
     */
    routes = (
      <Routes>
        <Route path="/" element={<Auth />}/>             
       
        <Route path="/auth" element={<Auth />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/verify" element={<ValidateEmailReminder />}/>  
        <Route path="/password-reset" element= {<PasswordReset />}/>
        <Route path="/reset-instructions" element={<ResetInstructions />} />      
        <Route path="/change-password/:tokenid" element={<ChangePassword />} />        
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
      logout: logout,
      changeRole: changeRole,
      role: role
    }}
  ><ClaimProvider><CardProvider>
    <Router>
    <MainNavigation /> 

      <main>{routes}</main>
    </Router></CardProvider></ClaimProvider>
  </AuthContext.Provider>
  );
};

export default App;
