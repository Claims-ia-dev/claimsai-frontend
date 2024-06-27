import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import SelectComponent from "../../shared/components/FormElements/SelectComponent";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./ClaimForm.css";

const NewClaim = (props) => {
  const navigate = useNavigate(); //to go to a diferent route

  const location = useLocation();
  const customerData = location.state?.customerData;

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

  // Initialize the form state with roomname, roomtype, and servicetype fields
  const [formState, inputHandler] = useForm(
    {
      roomname: {
        value: "",
        isValid: false,
      },
      roomtype: {
        value: "",
        isValid: false,
      },
      servicetype: {
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
   
    navigate("/claims/e1/EstimateCategoryClaims", { state: { customerData , roomData:formState.inputs }});

  };

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
    <>
      <form className="claim-form" onSubmit={claimSubmitHandler}>
        <p className="">
          Hello, before we start, please write the name of the room for a quote.{" "}
        </p>
        <Input
          id="roomname"
          element="input"
          type="text"
          placeholder="Room name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid room name."
          onInput={inputHandler}
        />

        <SelectComponent
          id="roomtype"
          label="Select the type of room"
          errorText="Please select the type of room"
          onChange={roomSelectHandler}
          options={roomTypes}
        />

        <SelectComponent
          id="servicetype"
          label="Select the type of service"
          errorText="Please select the type of service"
          onChange={serviceSelectHandler}
          options={serviceTypes}
        />

       

        <Button type="submit" disabled={!formState.isValid}>
          Create room
        </Button>
      </form>
    </>
  );
};

export default NewClaim;
