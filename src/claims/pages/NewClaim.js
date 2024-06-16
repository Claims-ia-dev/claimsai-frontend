import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './ClaimForm.css';

const NewClaim = () => {
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

  const claimSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend
  };

  const selectHandler = (event) => {
    const selectedValue = event.target.value;
    inputHandler("roomtype", selectedValue, true);
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
          onChange={selectHandler}
        >
          <option value="">Select the type of room</option>
          <option value="1">Bedroom</option>
          <option value="2">Bathroom</option>
          <option value="3">Living room</option>
          <option value="4">Kitchen</option>
          <option value="5">Garage</option>
          <option value="6">Other</option>
          {/* change this to the types of rooms available*/}
        </select>

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
