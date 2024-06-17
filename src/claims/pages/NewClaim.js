import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './ClaimForm.css';

const NewClaim = () => {

  // Initialize the form state with roomname, roomtype, and servicetype fields
  const [formState, inputHandler] = useForm(
    {
      roomname: {
        value: '',
        isValid: false
      },
      roomtype: {
        value: '',
        isValid: false
      },
      servicetype: {
        value: '',
        isValid: false
      },            
    },
    false
  );

  //handler for form submission (to add post api )
  const claimSubmitHandler = event => {
    event.preventDefault(); //prevents default behavior so it doesn't reload and tries to send data
    console.log(formState.inputs); 
  };

  //handler for room type selection 
  const typeSelectHandler = (event) => {
    //gets the selected value
    const typeSelectedValue = event.target.value;
    //fills the roomtype field with the selected value
    inputHandler("roomtype", typeSelectedValue, true);
  };

  return (
  <>
  
    <form className="claim-form" onSubmit={claimSubmitHandler}>
      <p className=''>Hello, before we start, please write the name of the room for a quote. </p>
      <Input
        id="roomname"
        element="input"
        type="text"
        placeholder="Room name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid room name."
        onInput={inputHandler}
      />
       <select
          id="roomtype"
          label="Room Type"
          errorText="Please select the type of room"
          onChange={typeSelectHandler}
        >
          <option value="">Select the type of room</option>
          <option value="1">Bedroom</option>
          <option value="2">Bathroom</option>
          <option value="3">Living room</option>
          <option value="4">Kitchen</option>
          <option value="5">Garage</option>
          <option value="6">Other</option>
          {/* change this to the types of rooms available in backend*/}
        </select>

      {/* to exchange input to select for the service type */}
      <Input 
        id="servicetype"
        element="input"
        placeholder="Service Type"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid service."
        onInput={inputHandler}
      />
      

      <Button type="submit" disabled={!formState.isValid}>
        Create room
      </Button>
    </form></>
  );
};

export default NewClaim;
