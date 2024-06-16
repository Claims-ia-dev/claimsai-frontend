import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './ClaimForm.css';

const DUMMY_CLAIMS = [
  {
    id: 'c1',
    roomname: 'Room 1',
    roomtype: '2',
    roomservice: 'cleaning',
    // selectedquestions: ['1', '2'] ,     
    creator: 'u1'
    // customer: 'cu1'
  },
  {
    id: 'c2',
    roomname: 'Room 2',
    roomtype: '3',
    roomservice: 'painting',
    // selectedquestions: ['2', '4'] ,     
    creator: 'u1'
    // customer: 'cu1'
  }
];

const UpdateClaim = () => {
  const [isLoading, setIsLoading] = useState(true);
  const claimId = useParams().claimId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      roomname: {
        value: '',
        isValid: false
      },
      roomtype: {
        value: '',
        isValid: false
      },
      roomservice: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const identifiedClaim = DUMMY_CLAIMS.find(c => c.id === claimId);

  useEffect(() => {
    if (identifiedClaim) {
      setFormData(
        {
          roomname: {
            value: identifiedClaim.roomname,
            isValid: true
          },
          roomtype: {
            value: identifiedClaim.roomtype,
            isValid: true
          },
          roomservice: {
            value: identifiedClaim.roomservice,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedClaim]);

  const claimUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedClaim) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find claim!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  const selectHandler = (event) => {
    const selectedValue = event.target.value;
    inputHandler("roomtype", selectedValue, true);
  };

 

  

  return (
    <form className="claim-form" onSubmit={claimUpdateSubmitHandler}>
      <Input
        id="roomname"
        element="input"
        type="text"
        placeholder="Room name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid roomname."
        onInput={inputHandler}
        initialValue={formState.inputs.roomname.value}
        initialValid={formState.inputs.roomname.isValid}
      />
      <select
          id="roomtype"
          label="Room Type"          
          initialValue={formState.inputs.roomtype.value}
          initialValid={true}
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
        id="roomservice"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid service (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.roomservice.value}
        initialValid={formState.inputs.roomservice.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE CLAIM
      </Button>
    </form>
  );
};

export default UpdateClaim;
