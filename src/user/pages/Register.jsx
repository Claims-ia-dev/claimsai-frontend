import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';

import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed]=useState(false);
  
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      first_name: {
        value: '',
        isValid: false,
      },
      last_name: {
        value: '',
        isValid: false,
      },
      company_name: {
        value: '',
        isValid: false,
      },
      phone: {
        value: '',
        isValid: false,
      },
      street: {
        value: '',
        isValid: false,
      },
      city: {
        value: '',
        isValid: false,
      },
      country: {
        value: '',
        isValid: false,
      },
      state: {
        value: '',
        isValid: false,
      },
      zip_code: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      confirm_email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      confirm_password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (
      formState.inputs.email.value === formState.inputs.confirm_email.value &&
      formState.inputs.password.value === formState.inputs.confirm_password.value
    ) {
      formState.isValid = true;
      setConfirmed(true);
    } else {
      formState.isValid = false;
      setConfirmed(false);
    }
  }, [formState, formState.inputs.email, formState.inputs.confirm_email, formState.inputs.password, formState.inputs.confirm_password]);

  const registerSubmitHandler = async event => {
    event.preventDefault();
    try {    
      const formData = new URLSearchParams();
        formData.append('first_name', formState.inputs.first_name.value);
        formData.append('last_name', formState.inputs.last_name.value);
        formData.append('company_name', formState.inputs.company_name.value);
        formData.append('phone', formState.inputs.phone.value);
        formData.append('street', formState.inputs.street.value);
        formData.append('city', formState.inputs.city.value);
        formData.append('country', formState.inputs.country.value);
        formData.append('state', formState.inputs.state.value);
        formData.append('zip_code', formState.inputs.zip_code.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);        
        
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
          'POST',
          formData.toString(),
          {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      );
      if(responseData){
        console.log("success");
        console.log(responseData)
        navigate('/verify', { state: { email: formState.inputs.email.value } });
      }
        else {
          console.error("Error :", responseData);
      }
      //console.log(responseData); 
       
      } catch (err) {}
  };

  return (
    <>  <ErrorModal error={error} onClear={clearError} />
   
   <div className='registration-page'>
    <Card className="registration">
    {isLoading && <LoadingSpinner asOverlay />}
      <div className='titleContainer'>
      <p className='intro'>Welcome to claims.ai to be able to use our artificial intelligence services, you need to create an account with us</p>
      </div>
      <br />
      <form className='registration' onSubmit={registerSubmitHandler}>
        <div className='section'>
        <div className='split'>
        <Input
          element="input"
          id="first_name"
          type="text"
          placeholder="First Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
             <Input
          element="input"
          id="last_name"
          type="text"
          placeholder="Last Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid last name."
          onInput={inputHandler}
        /> 
        </div>
        <div className='split'>
         <Input
          element="input"
          id="phone"
          type="text"
          placeholder="Telephone number"
          validators={[VALIDATOR_MINLENGTH(10)]}
          errorText="Please enter a phone number."
          onInput={inputHandler}
        />
             <Input
          element="input"
          id="company_name"
          type="text"
          placeholder="Company Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid company name."
          onInput={inputHandler}
        /></div>
         <Input
          element="input"
          id="street"
          type="text"
          placeholder="Street"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid street."
          onInput={inputHandler}
        />
        <div className='split'>
         <Input
          element="input"
          id="city"
          type="text"
          placeholder="City"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid city."
          onInput={inputHandler}
        />
         <Input
          element="input"
          id="country"
          type="text"
          placeholder="Country"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid country."
          onInput={inputHandler}
        /></div>
        <div className='split'>
         <Input
          element="input"
          id="state"
          type="text"
          placeholder="State"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid state."
          onInput={inputHandler}
        />
         <Input
          element="input"
          id="zip_code"
          type="text"
          placeholder="Zip/ Postal code"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        /></div></div>
        <div className='section'>
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
          id="confirm_email"
          type="email"
          placeholder="Confirm E-Mail Address"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please make sure the email matches and it is valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          placeholder="Password"
          validators={[VALIDATOR_PASSWORD()]}
          errorText="Please enter a valid password (at least 8 characters, including uppercase, lowercase, and digit)."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="confirm_password"
          type="password"
          placeholder="Confirm Password"
          validators={[VALIDATOR_PASSWORD()]}
          errorText="Make sure passwords match and are strong enough"
          onInput={inputHandler}
        />
            <div>
        <Button type="submit" disabled={!formState.isValid || !confirmed} size="wide" >
          Create Account
        </Button>
        </div> 
      
        </div> 
        
      </form> 
       {!confirmed &&<p className='error'>Make sure the emails and password fields match</p>}
  
      <p>Already a member?<Link to='/auth'> Login</Link> instead!</p>
    </Card>
    </div> 
    </>
  );
};

export default Register;