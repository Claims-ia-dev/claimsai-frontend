import React, { useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import SelectComponent from "../../shared/components/FormElements/SelectComponent";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import { useClaim } from "../../shared/hooks/claim-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useServiceTypes from "../../shared/hooks/service-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./ClaimForm.css";

//Called to edit claim
const UpdateClaim = () => {
  const { serviceTypeOptions, getServiceLabel, roomTypeOptions, getRoomLabel } = useServiceTypes();
  const { claim, claimId } = useClaim();
  const Idclaim=claimId;
  const navigate = useNavigate();
  
  const {error,  isLoading, clearError } = useHttpClient();

//gets the claimid and room id  from the url parameters

  // const Idclaim = useParams().claimId;
  const roomId = useParams().roomId;

  // useEffect(() => {
  //   fetchEstimateById(Idclaim);
  //   console.log(estimateData);
  // }, [Idclaim]);


  

  // Initialize the form state with room name, room type, and roomservice fields
  const [formState, inputHandler, setFormData] = useForm(
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
      },
    },
    false
  );

  const identifiedRoom = claim?.estimate_details.find(
    (room) => room.id === roomId
  );

  // Use the useEffect hook to update the form state when the component mounts
  useEffect(() => {
    // If a claim is found, update the form state with the claim data
    if (identifiedRoom) {
      console.log("cuarto identificado"+identifiedRoom);
      setFormData(
        {
          room_name: {
            value: identifiedRoom.room_name,
            isValid: true,
          },
          room_type: {
            value: identifiedRoom.room_type,
            isValid: true,
          },
          service_type: {
            value: identifiedRoom.service_type,
            isValid: true,
          },
        },
        true
      );
    }else{
      console.log("could not identify room")
    
    }
  }, [setFormData, identifiedRoom]);

  const claimUpdateSubmitHandler = (event) => {
    //handler to update claim (to add api endpoint for updates)
    event.preventDefault();

    navigate(`/claims/${Idclaim}/answers/${roomId}`, {
      state: { roomData: formState.inputs },
    });
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!identifiedRoom) {
    //In case the room is not found
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
    <>
    <div className='claim-form-page'>
    <ErrorModal error={error} onClear={clearError} />
    <form className="claim-form" onSubmit={claimUpdateSubmitHandler}>

      {isLoading && <LoadingSpinner asOverlay />}
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
        label={getRoomLabel(identifiedRoom.room_type)}
        initialValue={identifiedRoom.room_type}
        initialValid={true}
        errorText="Please select the type of room"
        onChange={roomSelectHandler}
        options={roomTypeOptions}
      />

      <SelectComponent
        id="service_type"
        label={getServiceLabel(identifiedRoom.service_type)}
        initialValue={identifiedRoom.service_type}
        initialValid={true}
        errorText="Please select the type of service"
        onChange={serviceSelectHandler}
        options={serviceTypeOptions}
      />

      <Button type="submit" disabled={!formState.isValid}>
        UPDATE CLAIM
      </Button>
    </form></div></>
  );
};

export default UpdateClaim;
