import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import SelectComponent from '../../shared/components/FormElements/SelectComponent';
import { useForm } from '../../shared/hooks/form-hook';
import './ClaimForm.css';

const DUMMY_CLAIMS = [
  {
    id: 'e1',
    customername: 'karla',
    phonenumber: '66111067755',
    address: 'Benito 23',
    city: 'Tijuana',
    state: 'BC',
    zip:'22710',
    insurance: '123',
    email: 'karla@gmail.com',
    roomname: 'Room 1',
    roomtype: '2',
    roomservice: 'cleaning',
    // selectedquestions: ['1', '2'] ,     
    creator: 'u1'
    // customer: 'cu1'
  },
  {
    id: 'e2',
    customername: 'beto',
    phonenumber: '66411067755',
    address: 'Benito 24',
    city: 'Tijuana',
    state: 'BC',
    zip:'22710',
    insurance: '1234',
    email: 'beto@gmail.com',
    roomname: 'Room 2',
    roomtype: '3',
    roomservice: 'painting',
    // selectedquestions: ['2', '4'] ,     
    creator: 'u1'
    // customer: 'cu1'
  }
];

//Called to edit claim
const UpdateClaim = () => {

  const roomTypes = [
    { value: "1", label: "Bedroom" },
    { value: "2", label: "Bathroom" },
    { value: "3", label: "Living room" },
    { value: "4", label: "Kitchen" },
    { value: "5", label: "Garage" },
    { value: "6", label: "Other" },
    // Add options from  backend API
  ];

  const serviceTypes = [
    { value: "1", label: "Painting" },
    { value: "2", label: "Cleaning" },
    { value: "3", label: "Building" },
    { value: "4", label: "Other" },
    // Add options from  backend API
  ];

  const [isLoading, setIsLoading] = useState(true); //initializes isLoading to true
  
  //gets the claimid from the url parameters
  const claimId = useParams().claimId;

   // Initialize the form state with roomname, roomtype, and roomservice fields
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
      servicetype: {
        value: '',
        isValid: false
      }
    },
    false
  );

  // Find the claim with the corresponding ID from the DUMMY_CLAIMS array
  const identifiedClaim = DUMMY_CLAIMS.find(e => e.id === claimId);

  // Use the useEffect hook to update the form state when the component mounts
  useEffect(() => {
     // If a claim is found, update the form state with the claim data
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
          servicetype: {
            value: identifiedClaim.servicetype,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedClaim]);

  const claimUpdateSubmitHandler = event => { //handler to update claim (to add api endpoint for updates)
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedClaim) { //In case the claim is not found
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

   //handler for room type selection
   const roomSelectHandler = (event) => {
    //gets the selected value
    const roomSelectedValue = event.target.value;
    //fills the roomtype field with the selected value
    inputHandler("roomtype", roomSelectedValue, true);
  };

  //handler for service type selection
  const serviceSelectHandler = (event) => {
    //gets the selected value
    const serviceSelectedValue = event.target.value;
    //fills the servicetype field with the selected value
    inputHandler("servicetype", serviceSelectedValue, true);
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

      
        <SelectComponent
          id="roomtype"
          label="Select the type of room"
          initialValue={formState.inputs.roomtype.value}
          initialValid={true}
          errorText="Please select the type of room"
          onChange={roomSelectHandler}
          options={roomTypes}
        />

        <SelectComponent
          id="servicetype"
          label="Select the type of service"
          initialValue={formState.inputs.servicetype.value}
          initialValid={true}
          errorText="Please select the type of service"
          onChange={serviceSelectHandler}
          options={serviceTypes}
        />

      
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE CLAIM
      </Button>
    </form>
  );
};

export default UpdateClaim;
