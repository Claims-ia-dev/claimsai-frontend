import React, {useState, useEffect, useContext}from "react";
import {useParams, useNavigate, useLocation } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import SelectComponent from "../../shared/components/FormElements/SelectComponent";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";
import { useClaim } from "../../shared/hooks/claim-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./ClaimForm.css";



//Called to edit claim
const UpdateClaim = () => {
  const auth = useContext(AuthContext);
  const navigate=useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [serviceTypes, setServiceTypes] = useState([]);

  const roomTypes = [
    { value: "Bathroom", label: "Bathroom" },
    { value: "Bedroom", label: "Bedroom" },
    { value: "Closet", label: "Closet" },
    { value: "Dining room", label: "Dining room" },
    { value: "Entry", label: "Entry" },
    { value: "Family room", label: "Family room" },
    { value: "Foyer", label: "Foyer" },
    { value: "Garage", label: "Garage" },
    { value: "General", label: "General" },
    { value: "Hallway", label: "Hallway" },
    { value: "Kitchen", label: "Kitchen" },
    { value: "Laundry room", label: "Laundry room" },
    // Add options from  backend API
  ];

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const responseData = await sendRequest(
          '/api/servicetype/services', // API endpoint
          'GET',
          null,
          {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          auth.token
        );
        console.log(responseData);
        const serviceTypesOptions = responseData.map((service) => ({
          value: service.code_service,
          label: service.service,
        }));
        setServiceTypes(serviceTypesOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServiceTypes();
  }, [sendRequest, auth.token]);

   //gets the claimid from the url parameters
  const Idclaim = useParams().claimId;
  const roomId=useParams().roomId;
  const roomIdNumber = parseInt(roomId, 10);
  
  const { claim } = useClaim();


   // Initialize the form state with room name, room type, and roomservice fields
  const [formState, inputHandler, setFormData] = useForm(
    {
      room_name: {
        value: '',
        isValid: false
      },
      room_type: {
        value: '',
        isValid: false
      },
      service_type: {
        value: '',
        isValid: false
      }
    },
    false
  );

  console.log("room id from param"+roomIdNumber);
  console.log(claim.room_details);
  const identifiedRoom = claim.room_details.find(room => room.id === roomIdNumber);
  console.log(identifiedRoom);
// Use the useEffect hook to update the form state when the component mounts
  useEffect(() => {
     // If a claim is found, update the form state with the claim data
    if (identifiedRoom) {
      setFormData(
        {
          room_name: {
            value: identifiedRoom.room_name,
            isValid: true
          },
          room_type: {
            value: identifiedRoom.room_type,
            isValid: true
          },
          service_type: {
            value: identifiedRoom.service_type,
            isValid: true
          }
        },
        true
      );
    }
  }, [setFormData, identifiedRoom]);

  const claimUpdateSubmitHandler = event => { //handler to update claim (to add api endpoint for updates)
    event.preventDefault();
    console.log(formState.inputs);
       
    navigate(`/claims/${Idclaim}/answers/${roomId}`, { state: {  roomData:formState.inputs }});

  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!identifiedRoom) { //In case the room is not found
    return (
      <div className="center">
        <Card>
          <h2>Could not find room!</h2>
        </Card>
      </div>
    );
  }

 

   //handler for room type selection
   const roomSelectHandler = (event) => {
    //gets the selected value
    const roomSelectedValue = event.target.value;
    //fills the room_type field with the selected value
    inputHandler("room_type", roomSelectedValue, true);
  };

  //handler for service type selection
  const serviceSelectHandler = (event) => {
    //gets the selected value
    const serviceSelectedValue = event.target.value;
    //fills the servicetype field with the selected value
    inputHandler("service_type", serviceSelectedValue, true);
  };




  return (
    <form className="claim-form" onSubmit={claimUpdateSubmitHandler}>
      <Input
        id="room_name"
        element="input"
        type="text"
        placeholder="Room name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid room name."
        onInput={inputHandler}
        initialValue={identifiedRoom.room_name}
        initialValid={true}
      />

      
        <SelectComponent
          id="room_type"
          label={identifiedRoom.room_type}
          initialValue={identifiedRoom.room_type}
          initialValid={true}
          errorText="Please select the type of room"
          onChange={roomSelectHandler}
          options={roomTypes}
        />

        <SelectComponent
          id="service_type"
          label={
            serviceTypes.find((option) => option.value === identifiedRoom.service_type)?.label
          }
          initialValue={identifiedRoom.service_type}
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
