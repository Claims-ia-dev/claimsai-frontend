import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Logo from '../../images/LogoClaimsIA.svg';
import './Auth.css';

const Auth = () => { //handles user aauthentication
  const auth = useContext(AuthContext);

  /**
   * Initialize the form state with email and password inputs
   * 
   * The useForm hook returns an array with three elements: formState, inputHandler, and setFormData.
   */
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );



  const authSubmitHandler = event => {
    event.preventDefault(); //this should connect to the backend 
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <Card className="authentication">
      <img className="authentication__logo" src={Logo} alt="ClaimsIA" />
      <br />
      <form onSubmit={authSubmitHandler}> 
    {/**Renders input fields for email and password */}
        <Input
          element="input"
          id="email"
          type="email"
          placeholder="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          placeholder="Password"
          validators={[VALIDATOR_MINLENGTH(5)]} //to change validators
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        /> 
        {/* goes to another route if the password is forgotten */}
        <a href='/password-reset'>Forgot you password?</a> <br/><br/> 

        <Button type="submit" disabled={!formState.isValid}>
          Login
        </Button>
      </form>
     
     {/**if not a member yet to send to another link */}
      <p>Not a member yet?<a href='#'> Choose a plan</a> and get started now!</p> <br/>
     
    </Card>
  );
};

export default Auth;
