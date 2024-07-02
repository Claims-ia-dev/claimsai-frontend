import React, {  useContext } from 'react';
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
    const formData = new URLSearchParams();
    formData.append('email', formState.inputs.email.value);
    formData.append('password', formState.inputs.password.value);

    const responseData = await sendRequest(
      '/api/auth/login',
      'POST',
      formData.toString(),
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      );
      console.log(responseData);
      console.log("token");
      console.log(responseData.token)
      auth.login(responseData.user.id, responseData.token, responseData.user);
    } catch (err) {
      // // if (err.code === 'unverified_email') {
      //   error.message = 'Please verify your email address. If you haven\'t received the verification email, you can resend it.';
      //   //error.resendEmail = true;
      // } else {
      console.log(err);
      // }
    }
  };

  // const resendVerificationEmail = async () => {
  //   try {
     
  //     // const responseData = await sendRequest('/api/auth/resend-verification-email', 'POST');
  //     // console.log(responseData);
  //      console("Email sent");
  //   } catch (err) {
  //     console.log(err);
  //   }
  //};

  return (
  <>
    <ErrorModal error={error} onClear={clearError}>
    {/* resendEmail={error.resendEmail}  */}
      {/* {error.resendEmail && (
          <Button onClick={resendVerificationEmail}>Resend Verification Email</Button>
        )} */}
    </ErrorModal>
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
      <p>Not a member yet?<a href='/register'> Register, Choose a plan</a> and get started now!</p> <br/>
      
    </Card></>
  );
};

export default Auth;
