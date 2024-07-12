import React, { useEffect } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import "./WorkTeam.css";

const WorkTeamMember = ({ member, onSubmit, isEditing, onCancel }) => {
  
  const [formState, inputHandler, setFormData] = useForm(
    {
      first_name: {
        value: "",
        isValid: false,
      },
      last_name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (member) {
      setFormData(
        {
          first_name: {
            value: member.first_name,
            isValid: true,
          },
          last_name: {
            value: member.last_name,
            isValid: true,
          },
          email: {
            value: member.email,
            isValid: true,
          },
          password: {
            value: member.phone,
            isValid: true,
          },
        },
        true
      );
    }
  }, [member, setFormData]);

  console.log(member);

  const submitHandler = (event) => {
    event.preventDefault();

    onSubmit(member, formState.inputs);
  };

  

  const cancelHandler = () => {
    setFormData(
      {
        first_name: {
          value: "",
          isValid: false,
        },
        last_name: {
          value: "",
          isValid: false,
        },
        email: {
          value: "",
          isValid: false,
        },
        password: {
          value: "",
          isValid: false,
        },
      },
      false
    );
    onCancel(); // Call the onCancel function to set isEditing to false
  };

  return (
    <>
      {/* form in case the user is adding a member to the team */}
      {!isEditing && (
        <form onSubmit={submitHandler}>
          <div className="workteam-form__inputs">
            <div className="split">
              <Input
                element="input"
                id="first_name"
                type="text"
                placeholder="First Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name"
                onInput={inputHandler}
              />

              <Input
                element="input"
                id="last_name"
                type="text"
                placeholder="Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid last name"
                onInput={inputHandler}
              />
            </div>

            <Input
              element="input"
              id="email"
              type="email"
              placeholder="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />

            <Input
              element="input"
              id="password"
              type="password"
              placeholder="Password"
              validators={[VALIDATOR_PASSWORD()]}
              errorText="Please enter a stronger password."
              onInput={inputHandler}
            />
          </div>
          <Button type="submit" disabled={!formState.isValid}>
            Add new user
          </Button>
        </form>
      )}
      {/* form for when an edit is being made on a member of the team */}
      {isEditing && (
        <form onSubmit={submitHandler}>
          <div className="workteam-form__inputs">
            <Input
              element="input"
              id="first_name"
              type="text"
              placeholder="First Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name"
              onInput={inputHandler}
              initialValue={member.first_name}
              initialValid={true}
            />

            <Input
              element="input"
              id="last_name"
              type="text"
              placeholder="Last Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid last name"
              onInput={inputHandler}
              initialValue={member.last_name}
              initialValid={true}
            />

            <Input
              element="input"
              id="email"
              type="email"
              placeholder="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
              initialValue={member.email}
              initialValid={true}
            />
          </div>
          <Button type="submit" disabled={!formState.isValid}>
            Edit member
          </Button>

      
            <Button
            className="workteam_cancel_button"
              onClick={cancelHandler}
              inverse
              disabled={!formState.isValid}
            >
              Cancel
            </Button>
          
        </form>
      )}
    </>
  );
};

export default WorkTeamMember;
