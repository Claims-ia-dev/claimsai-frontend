import React, {  useContext}from "react";
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useClaim } from '../../shared/hooks/claim-hook';
import './CustomerForm.css';

const NewCustomer = () => {

  const auth = useContext(AuthContext);
  
  const navigate = useNavigate(); //to go to a diferent route
  // Initialize the form state with customer fields
  const [formState, inputHandler] = useForm(
    {
      customer_name: {
        value: '',
        isValid: false
      },
      phone_number: {
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
      },
      claim_number: {
        value: "",
        isValid: true,
      },
    },
    false
  );
  const { updateClaim } = useClaim(); //claim context to see or modify a claim

  
 
  //handler to send data to new claim and connect to database from there to make a a new "estimate" (set as estimate in database)
  const claimSubmitHandler = event => {
    event.preventDefault(); //prevents default behavior so it doesn't reload and tries to send data
   
    //creating new Claim
    const newCustomerInfo = {
      userId: auth.userId,
      customer_info:  Object.fromEntries(
        Object.entries(formState.inputs).map(([key, value]) => [key, value.value])
      ),
      room_details: []
    }

    updateClaim(newCustomerInfo);
   
   
    // navigate to the desired route
    navigate('/claims/new');

    //to send customer data to the route that takes you to NewClaim
  };

  
  return (
  <>
  <div className="customer-form-page">
    <form className="customer-form" onSubmit={claimSubmitHandler}>
      {/* instructions */}
      <p className=''>To begin creating an estimate, please enter customer information. </p> 
      <div className='customer-form__inputs'> 
      <div  className='split'>
      <Input
        id="customer_name"
        element="input"
        type="text"
        placeholder="Customer name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid customer name."
        onInput={inputHandler}
      />

      <Input 
        id="phone_number"
        element="input"
        placeholder="Phone Number"
        validators={[VALIDATOR_MINLENGTH(10)]}
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
        validators={[VALIDATOR_MINLENGTH(5)]}
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

      <div className='split'>
      <Input 
        id="email"
        element="input"
        placeholder="Email"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email."
        onInput={inputHandler}
      />

      <Input
        id="claim_number"
        element="input"
        type="text"
        placeholder="Claim number"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid claim number."
        onInput={inputHandler}
      />
      </div>
      </div>
      

      <Button type="submit" disabled={!formState.isValid} size="wide">
        Create estimate
      </Button>
    </form>
    </div>
    </>
  );
};

export default NewCustomer;
