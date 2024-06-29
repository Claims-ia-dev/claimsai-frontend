import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_EQUAL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Logo from '../../images/LogoClaimsIA.svg';
import './Register.css';

const Register = () => {
  const auth = useContext(AuthContext); 
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
          '/api/auth/signup',
          'POST',
          formData.toString(),
          {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      );
      console.log(responseData)

       auth.login(responseData.userId, responseData.token, responseData.user);
      } catch (err) {}
  };

  return (
    <>  <ErrorModal error={error} onClear={clearError} />
   
    <Card className="authentication">
    {isLoading && <LoadingSpinner asOverlay />}
      <img className="authentication__logo" src={Logo} alt="ClaimsIA" />
      <br />
      <form onSubmit={registerSubmitHandler}>
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
        />    <Input
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
        />
         <Input
          element="input"
          id="street"
          type="text"
          placeholder="Street"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid street."
          onInput={inputHandler}
        />
         <Input
          element="input"
          id="city"
          type="text"
          placeholder="city"
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
        />
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
        />
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
          validators={[VALIDATOR_EMAIL(), VALIDATOR_EQUAL(formState.inputs.email.value)]}
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
          validators={[VALIDATOR_PASSWORD(), VALIDATOR_EQUAL(formState.inputs.password.value)]}
          errorText="Make sure passwords match and are strong enough"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Register
        </Button>
      </form>
      <p>Already a member?<a href='/auth'> Login</a> instead!</p>
    </Card> </>
  );
};

export default Register;