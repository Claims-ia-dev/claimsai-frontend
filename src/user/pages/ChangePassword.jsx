import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_PASSWORD
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Logo from '../../images/LogoClaimsIA.svg';
import './Auth.css';

const ChangePassword = () => { //handles user aauthentication
  
  
const navigate= useNavigate();
const { isLoading, error, sendRequest, clearError } = useHttpClient();
const [confirmed, setConfirmed]=useState(false);

const auth = useContext(AuthContext);
const token= useParams().tokenid;

  /**
   * Initialize the form state with email and password inputs
   * 
   * The useForm hook returns an array with three elements: formState, inputHandler, and setFormData.
   */
 


  const [formState, inputHandler] = useForm(
 
    {
      
      newpassword: {
        value: '',
        isValid: false
      },
      confirmpassword: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    if (
      formState.inputs.newpassword.value === formState.inputs.confirmpassword.value
    ) {
      formState.isValid = true;
      setConfirmed(true);
    } else {
      formState.isValid = false;
      setConfirmed(false);
    }
  }, [formState,formState.inputs.newpassword, formState.inputs.confirmpassword]);

  const SubmitHandler = async event => {
    event.preventDefault(); //this should connect to the backend 
    const data = {
      new_password: formState.inputs.newpassword.value,
      new_password_confirm: formState.inputs.confirmpassword.value,
    };
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/updaterecoverypassword`,
        "POST",
        JSON.stringify(data),
        {
          "Content-Type": "application/json",
        },
        token
      );
      //console.log(response);
      console.log("sent to server");
      if (response) {
        console.log("Password updated successfully!");
       
        navigate('/auth');
        
      } else {
        console.error("Error updating password:", response);
      }
    } catch (err) {
      console.error("Error updating password:", err);
    }
  
    
  };

  return (
    <div className='auth-page'>
    <ErrorModal error={error} onClear={clearError}></ErrorModal>
    <Card className="authentication">
    {isLoading && <LoadingSpinner asOverlay />}
      <img className="authentication__logo" src={Logo} alt="ClaimsIA" />
      <br />
      <form onSubmit={SubmitHandler}> 
    {/**Renders input fields for password */}
      <p className="center-text">Enter your new password. After confirming, you will be asked to login again.</p>
        <Input
          element="input"
          id="newpassword"
          type="password"
          placeholder="New Password"
          validators={[VALIDATOR_PASSWORD()]} 
          errorText="Please enter a valid password (at least 8 characters, including uppercase, lowercase, and digit)."
          onInput={inputHandler}
        /> 
          <Input
          element="input"
          id="confirmpassword"
          type="password"
          placeholder="Confirm New Password"
          validators={[VALIDATOR_PASSWORD()]}
          errorText="Make sure passwords match and are strong enough"
          onInput={inputHandler}
        /> 
        {/* goes to another route if the password is forgotten */}

        <Button type="submit" disabled={!formState.isValid || !confirmed} size="wide">
          Reset Password
        </Button>
       
      </form>
     
     {/**if not a member yet to send to another link */}
         {!confirmed &&<p className='error'>Make sure the new password and confirm password fields match</p>}
         {!auth.isLoggedIn&&<p className="center-text">Never mind! <Link href='/auth'> Take me back to login</Link></p>} <br/>
   
    </Card>
    </div>
  );
};

export default ChangePassword;