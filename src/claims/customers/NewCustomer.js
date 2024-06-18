import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import NewClaim from '../pages/NewClaim';
import './ClaimForm.css';

const NewCustomer = () => {

  // Initialize the form state with customer fields
  const [formState, inputHandler] = useForm(
    {
      customername: {
        value: '',
        isValid: false
      },
      phonenumber: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },   
      city: {
        value: '',
        isValid: false
      },
      state: {
        value: '',
        isValid: false
      },
      zip: {
        value: '',
        isValid: false
      },   
      insurance: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      }
    },
    false
  );

  //handler to send data to new claim and connect to database from there to make a a new "estimate" (set as estimate in database)
  const claimSubmitHandler = event => {
    event.preventDefault(); //prevents default behavior so it doesn't reload and tries to send data
    console.log(formState.inputs); 
    <NewClaim/> //to send customer data
  };

  
  return (
  <>
  
    <form className="claim-form" onSubmit={claimSubmitHandler}>
      <p className=''>To begin creating an estimate, please enter customer information. </p>
      <Input
        id="customername"
        element="input"
        type="text"
        placeholder="Customer name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid customer name."
        onInput={inputHandler}
      />

      <Input 
        id="phonenumber"
        element="input"
        placeholder="Phone Number"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid phone number."
        onInput={inputHandler}
      />
         <Input
        id="address"
        element="input"
        type="text"
        placeholder="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />

      <Input 
        id="city"
        element="input"
        placeholder="City"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a City."
        onInput={inputHandler}
      />
      
      <Input
        id="state"
        element="input"
        type="text"
        placeholder="State/Province"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid State/Province."
        onInput={inputHandler}
      />

      <Input 
        id="zip"
        element="input"
        placeholder="Zip/Postal Code"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a zip or postal code."
        onInput={inputHandler}
      />
      
      <Input
        id="insurance"
        element="input"
        type="text"
        placeholder="Insurance"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid insurance."
        onInput={inputHandler}
      />

      <Input 
        id="email"
        element="input"
        placeholder="Email"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid email."
        onInput={inputHandler}
      />
      
      

      <Button type="submit" disabled={!formState.isValid}>
        Create estimate
      </Button>
    </form></>
  );
};

export default NewCustomer;
