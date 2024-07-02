import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import ResetInstructions from './ResetInstructions';
import Button from '../../shared/components/FormElements/Button';
import { useNavigate } from 'react-router-dom';
import {
  VALIDATOR_EMAIL
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Logo from '../../images/LogoClaimsIA.svg';
import './Auth.css';

const PasswordReset = () => {
 /* * It provides a form for users to enter their email address and receive reset instructions.
  */

  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
    
    },
    false
  );

 

  const SubmitHandler = event => {
    <ResetInstructions items={formState.email}/>
    event.preventDefault();
     // To call the reset password function here
     
     // navigate to the desired route
     navigate('/reset-instructions', { state: { email: formState.inputs.email.value } });

    
  
  };

  return (
    <Card className="authentication">
      <img className="authentication__logo" src={Logo} alt="ClaimsIA" />
      <br />
      <form onSubmit={SubmitHandler}>
        
      <p>To reset your password, enter the email address you use to log in</p> 
            
        <Input
          element="input"
          id="email"
          type="email"
          placeholder="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
       
        <Button type="submit" disabled={!formState.isValid}>
          Get reset link
        </Button>
      </form>
     
      <p>Never mind!<a href='/'> Take me back to login</a></p> <br/>
     
    </Card>
  );
};

export default PasswordReset;