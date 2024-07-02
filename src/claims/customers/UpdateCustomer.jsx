import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import UpdateClaim from "../pages/UpdateClaim";
import "./CustomerForm.css";



//Called to edit customer data from claim
const UpdateCustomer = () => {
  const [isLoading, setIsLoading] = useState(true); //initializes isLoading to true

  //gets the claimid from the url parameters
  const claimId = useParams().claimId;

  // Initialize the form state with customer fields
  const [formState, inputHandler, setFormData] = useForm(
    {
      customername: {
        value: "",
        isValid: false,
      },
      phonenumber: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      state: {
        value: "",
        isValid: false,
      },
      zip: {
        value: "",
        isValid: false,
      },
      insurance: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // Find the claim with the corresponding ID from the DUMMY_CLAIMS array
  const identifiedClaim = DUMMY_CLAIMS.find((e) => e.id === claimId);

  // Use the useEffect hook to update the form state when the component mounts
  useEffect(() => {
    // If a claim is found, update the form state with the claim data
    if (identifiedClaim) {
      //it uses the claim id so it get the data inside the estimates table , customer info will be in the same table as claim (estimates table in backend)
      setFormData(
        {
          customername: {
            value: "",
            isValid: true,
          },
          phonenumber: {
            value: "",
            isValid: true,
          },
          address: {
            value: "",
            isValid: true,
          },
          city: {
            value: "",
            isValid: true,
          },
          state: {
            value: "",
            isValid: true,
          },
          zip: {
            value: "",
            isValid: true,
          },
          insurance: {
            value: "",
            isValid: true,
          },
          email: {
            value: "",
            isValid: true,
          },
          claimnumber: {
            value: "",
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedClaim]);

  const claimUpdateSubmitHandler = (event) => {
    //handler to send data to update claim and connect to database from there
    event.preventDefault();
    console.log(formState.inputs);
    <UpdateClaim />; //send customer data
  };

  if (!identifiedClaim) {
    //In case the claim is not found
    return (
      <div className="center">
        <Card>
          <h2>Could not find claim!</h2>
        </Card>
      </div>
    );
  }

 

  return (
    <form className="customer-form" onSubmit={claimUpdateSubmitHandler}>
       {isLoading && <LoadingSpinner asOverlay />}
      <div className="customer-form__inputs">
        <div className="split">
          <Input
            id="customername"
            element="input"
            type="text"
            placeholder="Customer name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid customer name."
            onInput={inputHandler}
            initialValue={formState.inputs.customername.value}
            initialValid={formState.inputs.customername.isValid}
          />

          <Input
            id="phonenumber"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a phone number (min. 10 numnbers)."
            onInput={inputHandler}
            initialValue={formState.inputs.phonenumber.value}
            initialValid={formState.inputs.phonenumber.isValid}
          />
        </div>
        <Input
          id="address"
          element="input"
          type="text"
          placeholder="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
          initialValue={formState.inputs.address.value}
          initialValid={formState.inputs.address.isValid}
        />

        <div className="split">
          <Input
            id="city"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid city (min. 5 characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.city.value}
            initialValid={formState.inputs.city.isValid}
          />
          <Input
            id="state"
            element="input"
            type="text"
            placeholder="State/province"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid state or province."
            onInput={inputHandler}
            initialValue={formState.inputs.state.value}
            initialValid={formState.inputs.state.isValid}
          />
        </div>
        <div className="split">
          <Input
            id="zip"
            element="textarea"
            placeholder="zip"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid zip or postal code (min. 5 characters)."
            onInput={inputHandler}
            initialValue={formState.inputs.zip.value}
            initialValid={formState.inputs.zip.isValid}
          />
          <Input
            id="insurance"
            element="input"
            type="text"
            placeholder="insurance"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid insurance."
            onInput={inputHandler}
            initialValue={formState.inputs.insurance.value}
            initialValid={formState.inputs.insurance.isValid}
          />
        </div>
        <div className="split">
        <Input
          id="email"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email (min. 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.email.value}
          initialValid={formState.inputs.email.isValid}
        />
         <Input
            id="claimnumber"
            element="input"
            type="text"
            placeholder="Claim number"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid claim number."
            onInput={inputHandler}
            initialValue={formState.inputs.claimnumber.value}
            initialValid={formState.inputs.claimnumber.isValid}
          />
        </div>
      </div>
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE ESTIMATE
      </Button>
    </form>
  );
};

export default UpdateCustomer;
