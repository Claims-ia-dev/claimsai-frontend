import React, {  useContext}from "react";
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_OPTIONAL,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useClaim } from '../../shared/hooks/claim-hook';
import './CustomerForm.css';

const NewCustomer = () => {
  const { isLoading, error,  clearError } = useHttpClient();

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
        isValid: true
      },
      address: {
        value: '',
        isValid: true
      },   
      city: {
        value: '',
        isValid: true
      },
      state: {
        value: '',
        isValid: true
      },
      zip: {
        value: '',
        isValid: true
      },   
      insurance: {
        value: '',
        isValid: true
      },
      email: {
        value: '',
        isValid: true
      },
      claim_number: {
        value: "",
        isValid: true,
      },
    },
    true
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
      estimate_details: []
    }

    updateClaim(newCustomerInfo);
   
   
    // navigate to the desired route
    navigate('/claims/new');

    //to send customer data to the route that takes you to NewClaim
  };

  
  return (
  <> 
  <ErrorModal error={error} onClear={clearError}></ErrorModal>
  <div className="customer-form-page">
 
  {isLoading && <LoadingSpinner asOverlay />}
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
        validators={[VALIDATOR_OPTIONAL()]}
        initialValid={formState.inputs.phone_number.isValid}
        errorText="Please enter a valid phone number."
        onInput={inputHandler}
      /> </div>

      
         <Input
        id="address"
        element="input"
        type="text"
        placeholder="Address"
        validators={[VALIDATOR_OPTIONAL()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
        initialValid={formState.inputs.address.isValid}
      />

      <div className='split'> 

      <Input 
        id="city"
        element="input"
        placeholder="City"
        validators={[VALIDATOR_OPTIONAL()]}
        errorText="Please enter a City."
        onInput={inputHandler}
        initialValid={formState.inputs.city.isValid}
      />
      
      <Input
        id="state"
        element="input"
        type="text"
        placeholder="State/Province"
        validators={[VALIDATOR_OPTIONAL()]}
        errorText="Please enter a valid State/Province."
        onInput={inputHandler}
        initialValid={formState.inputs.state.isValid}
      /></div>

      <div className='split'> 

      <Input 
        id="zip"
        element="input"
        placeholder="Zip/Postal Code"
        validators={[VALIDATOR_OPTIONAL()]}
        errorText="Please enter a zip or postal code."
        onInput={inputHandler}
        initialValid={formState.inputs.zip.isValid}
      />
      
      <Input
        id="insurance"
        element="input"
        type="text"
        placeholder="Insurance"
        validators={[VALIDATOR_OPTIONAL()]}
        errorText="Please enter a valid insurance."
        onInput={inputHandler}
        initialValid={formState.inputs.insurance.isValid}
      /></div>

      <div className='split'>
      <Input 
        id="email"
        element="input"
        placeholder="Email"
        validators={[VALIDATOR_OPTIONAL()]}
        errorText="Please enter a valid email."
        onInput={inputHandler}
        initialValid={formState.inputs.email.isValid}
      />

      <Input
        id="claim_number"
        element="input"
        type="text"
        placeholder="Claim number"
        validators={[VALIDATOR_OPTIONAL()]}
        errorText="Please enter a valid claim number."
        onInput={inputHandler}
        initialValid={formState.inputs.claim_number.isValid}
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
