import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import SelectComponent from "../../shared/components/FormElements/SelectComponent";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import useServiceTypes from "../../shared/hooks/service-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./ClaimForm.css";

const NewClaim = () => {

  const navigate = useNavigate(); //to go to a diferent route

  const { isLoading, error, clearError} = useHttpClient();
  const { serviceTypeOptions, roomTypeOptions} = useServiceTypes();

  
   

  // Initialize the form state with room name, room type, and service type fields
  const [formState, inputHandler] = useForm(
    {
      room_name: {
        value: "",
        isValid: false,
      },
      room_type: {
        value: "",
        isValid: false,
      },
      service_type: {
        value: "",
        isValid: false,
      }
    },
    false
  );



  //handler for form submission (to add post api )
  const claimSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
       
    navigate("/claims/EstimateCategoryClaims", { state: {  roomData:formState.inputs }});

  };

  //handler for room type selection
  const roomSelectHandler = (event) => {
    //gets the selected value
    const roomSelectedValue = event.target.value;
    //fills the room type field with the selected value
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
    <>
    <div className='claim-form-page'>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && <LoadingSpinner asOverlay />}
      <form className="claim-form" onSubmit={claimSubmitHandler}>
        <p className="">
          Hello, before we start, please write the name of the room for a quote.{" "}
        </p>
        <Input
          id="room_name"
          element="input"
          type="text"
          placeholder="Room name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid room name."
          onInput={inputHandler}
        />

        <SelectComponent
          id="room_type"
          label="Select the type of room"
          errorText="Please select the type of room"
          onChange={roomSelectHandler}
          options={roomTypeOptions}
        />

        <SelectComponent
          id="service_type"
          label="Select the type of service"
          errorText="Please select the type of service"
          onChange={serviceSelectHandler}
          options={serviceTypeOptions}
        />

       

        <Button type="submit" disabled={!formState.isValid} size="wide">
          Create room
        </Button>
      </form>
      </div>
    </>
  );
};

export default NewClaim;
