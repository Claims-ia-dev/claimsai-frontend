import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_EQUAL,
  VALIDATOR_PASSWORD,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Logo from '../../images/LogoClaimsIA.svg';
import './Auth.css';

const Register = () => {
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      confirmPassword: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const registerSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    // Call the registration API endpoint here
    auth.login();
  };

  return (
    <Card className="authentication">
      <img className="authentication__logo" src={Logo} alt="ClaimsIA" />
      <br />
      <form onSubmit={registerSubmitHandler}>
        <Input
          element="input"
          id="name"
          type="text"
          placeholder="Full Name"
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
          id="password"
          type="password"
          placeholder="Password"
          validators={[VALIDATOR_PASSWORD()]}
          errorText="Please enter a valid password (at least 8 characters, including uppercase, lowercase, and digit)."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="confirmPassword"
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
    </Card>
  );
};

export default Register;