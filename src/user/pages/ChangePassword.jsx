import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_PASSWORD, VALIDATOR_EQUAL
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Logo from '../../images/LogoClaimsIA.svg';
import './Auth.css';

const ChangePassword = () => { //handles user aauthentication
  
const navigate= useNavigate();
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



  const SubmitHandler = event => {
    event.preventDefault(); //this should connect to the backend 
    console.log(formState.inputs);
    navigate('/auth');
    
  };

  return (
    <Card className="authentication">
      <img className="authentication__logo" src={Logo} alt="ClaimsIA" />
      <br />
      <form onSubmit={SubmitHandler}> 
    {/**Renders input fields for password */}
      <p>Enter your new password. After confirming, you will be asked to login again</p>
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
          validators={[VALIDATOR_PASSWORD(), VALIDATOR_EQUAL(formState.inputs.newpassword.value)]}
          errorText="Make sure passwords match and are strong enough"
          onInput={inputHandler}
        /> 
        {/* goes to another route if the password is forgotten */}

        <Button type="submit" disabled={!formState.isValid}>
          Reset Password
        </Button>
       
      </form>
     
     {/**if not a member yet to send to another link */}
      <p>Never mind! <a href='/auth'> Take me back to login</a></p> <br/>
     
    </Card>
  );
};

export default ChangePassword;