import React, {  useContext, useState } from 'react';
import { Link } from 'react-router-dom';
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
import Modal from '../../shared/components/UIElements/Modal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './Auth.css';
// import { https } from 'https-proxy-agent';

// const agent = new https.Agent({
//   rejectUnauthorized: false, // disable certificate validation
// });

const Auth = () => { //handles user authentication
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  const [errorDisplay, setErrorDisplay]=useState(null);
  const [showVerificationButton, setShowVerificationButton]=useState(false);
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
    const formData = new URLSearchParams();
    formData.append('email', formState.inputs.email.value);
    formData.append('password', formState.inputs.password.value);

    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
      'POST',
      formData.toString(),
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      );
      console.log(responseData.token);
      console.log(responseData.user);
      auth.login(responseData.user.id, responseData.token, responseData.user);
    } catch (err) {
    

    }
  };

  const clearErrorDisplay = () => {
    setErrorDisplay(null);
    clearError()
  };

  const resendVerificationEmail = async () => {
    try {
      const formData = new URLSearchParams();
    formData.append('email', formState.inputs.email.value);     
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/auth/resendvalidationemail`, 
      'POST',
      formData.toString(),
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      );
      console.log(responseData);
       console("Email sent");
    } catch (err) {
      console.log(err);
    }
    clearError();
  };

  return (
  <>
    {isLoading && <LoadingSpinner asOverlay />}
   <Modal
      onCancel={clearErrorDisplay}
      header="An Error Occurred!"
      show={!!error}
      footerClass="error_modal-actions"
      footer={
        <React.Fragment>
        {error === 'Unverified email'&&(
      <Button inverse onClick={resendVerificationEmail}>
        Resend verification email
      </Button> )}
      <Button  onClick={clearErrorDisplay}>
        Okey 
      </Button>
    </React.Fragment>   
      }
    >
     {error === 'Unverified email'&& <p>Please check your email inbox and verify your email address.</p> }
     {error === 'User not found'&& <p>You have entered an invalid email or password</p> }
     {error === 'Failed to fetch'&& <p>Error 503: </p> }
     {error !== 'Unverified email'&& error !== 'User not found'&& <p>{error}</p> }

    </Modal>
    

    <div className="auth-page">
    <Card className="authentication">
    
      <img className="authentication__logo" src={Logo} alt="ClaimsIA" />
      <br />
      <form onSubmit={authSubmitHandler}> 
    {/**Renders input fields for email and password */}
        <Input
          element="input"
          id="email"
          type="email"
          placeholder="Enter email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type= 'password'
          placeholder="Enter password"
          validators={[]} 
          errorText=""
          onInput={inputHandler}
          />
       
         
        {/* goes to another route if the password is forgotten */}
        <a className="black-link" href='/password-reset'>Forgot you password?</a> <br/><br/> 

        <Button type="submit" disabled={!formState.isValid} size="wide">
          Sign in
        </Button>
      </form>
     
     {/**if not a member yet to send to another link */}
      <p className="center-text">Not a member yet?<Link to='/register' > Register</Link> and get started now!</p> <br/>
      
    </Card>
    </div>
    </>
  );
};

export default Auth;
