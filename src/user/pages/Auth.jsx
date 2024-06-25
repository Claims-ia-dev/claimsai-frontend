import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Logo from '../../images/LogoClaimsIA.svg';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './Auth.css';
// import { https } from 'https-proxy-agent';

// const agent = new https.Agent({
//   rejectUnauthorized: false, // disable certificate validation
// });

const Auth = () => { //handles user authentication
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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



  const authSubmitHandler = async event => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        'https://dashboard.xclaims.ai:3003/api/auth/login',
        'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      console.log(responseData);
      auth.login(responseData.user.id, responseData.token);
    } catch (err) {}
  };

  return (
  <>
    <ErrorModal error={error} onClear={clearError} />
    <Card className="authentication">
    {isLoading && <LoadingSpinner asOverlay />}
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
          type= 'password'
          placeholder="Password"
          validators={[VALIDATOR_PASSWORD()]} 
          errorText="Please enter a valid password (at least 8 characters, including uppercase, lowercase, and digit)."
          onInput={inputHandler}
          />
       
         
        {/* goes to another route if the password is forgotten */}
        <a href='/password-reset'>Forgot you password?</a> <br/><br/> 

        <Button type="submit" disabled={!formState.isValid}>
          Login
        </Button>
      </form>
     
     {/**if not a member yet to send to another link */}
      <p>Not a member yet?<a href='/register'> Choose a plan</a> and get started now!</p> <br/>
     
    </Card></>
  );
};

export default Auth;
