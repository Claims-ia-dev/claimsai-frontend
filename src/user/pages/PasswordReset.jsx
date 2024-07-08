import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
//import ResetInstructions from './ResetInstructions';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useNavigate } from 'react-router-dom';
import {
  VALIDATOR_EMAIL
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Logo from '../../images/LogoClaimsIA.svg';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Auth.css';

const PasswordReset = () => {
 /* * It provides a form for users to enter their email address and receive reset instructions.
  */

  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
    
    },
    false
  );

 

  const SubmitHandler = async event => {
    // <ResetInstructions items={formState.email}/>
    event.preventDefault();
     // To call the reset password function here

      try {
    const formData = new URLSearchParams();
    formData.append('email', formState.inputs.email.value);

    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/recoverypassword`,
      'POST',
      formData.toString(),
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      );
      if(responseData){
        console.log("success");
      }
     // console.log(responseData.token)
      } catch (err) {
      
      console.log(err);
    
    }
  
     // navigate to the desired route
     navigate('/reset-instructions', { state: { email: formState.inputs.email.value } });

    
  
  };

  return (
    <div className='auth-page'>
       <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {isLoading && <LoadingSpinner asOverlay />}
    <Card className="authentication">
      <img className="authentication__logo" src={Logo} alt="ClaimsIA" />
      <br />
      <form onSubmit={SubmitHandler}>
        
      <p className="center-text">To reset your password, enter the email address you use to log in</p> 
            
        <Input
          element="input"
          id="email"
          type="email"
          placeholder="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
       
        <Button type="submit" disabled={!formState.isValid} size="wide">
          Get reset link
        </Button>
      </form>
     
      <p className="center-text">Never mind!<Link to='/'> Take me back to login</Link></p> <br/>
     
    </Card>
    </div>
  );
};

export default PasswordReset;