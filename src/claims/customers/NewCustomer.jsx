import React from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './CustomerForm.css';



const NewCustomer = () => {

  
  const navigate = useNavigate(); //to go to a diferent route
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
    // navigate to the desired route
    navigate('/claims/new');

    //to send customer data to the route that takes you to NewClaim
  };

  
  return (
  <>
  
    <form className="customer-form" onSubmit={claimSubmitHandler}>
      <p className=''>To begin creating an estimate, please enter customer information. </p>
      <div className='customer-form__inputs'>
      <div  className='split'>
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
      /> </div>

      
         <Input
        id="address"
        element="input"
        type="text"
        placeholder="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />

      <div className='split'> 

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
      /></div>

      <div className='split'> 

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
      /></div>


      <Input 
        id="email"
        element="input"
        placeholder="Email"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid email."
        onInput={inputHandler}
      />
      </div>
      

      <Button type="submit" disabled={!formState.isValid}>
        Create estimate
      </Button>
    </form></>
  );
};

export default NewCustomer;
