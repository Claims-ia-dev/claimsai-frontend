import React, { useEffect } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
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
      phone: {
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
          phone: {
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
        phone: {
          value: "",
          isValid: false,
        },
      },
      false
    );
    onCancel(); // Call the onCancel function to set isEditing to false
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="workteam-form__inputs">
        <div className="split">
          {isEditing && (
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
          )}
          {!isEditing && (
            <Input
              element="input"
              id="first_name"
              type="text"
              placeholder="First Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name"
              onInput={inputHandler}
            />
          )}
          {isEditing && (
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
          )}
          {!isEditing && (
            <Input
              element="input"
              id="last_name"
              type="text"
              placeholder="Last Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid last name"
              onInput={inputHandler}
            />
          )}
        </div>

        {isEditing && (
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
        )}
        {!isEditing && (
          <Input
            element="input"
            id="email"
            type="email"
            placeholder="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
        )}

        {isEditing && (
          <Input
            element="input"
            id="phone"
            type="text"
            placeholder="Phone"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid phone number."
            onInput={inputHandler}
            initialValue={member.phone}
            initialValid={true}
          />
        )}

        {!isEditing && (
          <Input
            element="input"
            id="phone"
            type="text"
            placeholder="Phone"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid phone number."
            onInput={inputHandler}
          />
        )}
      </div>
      <Button type="submit" disabled={!formState.isValid}>
        {isEditing ? "Edit member" : "Add new user"}
      </Button>

      {isEditing && (
        <Button onClick={cancelHandler} inverse disabled={!formState.isValid}>
          Cancel
        </Button>
      )}
    </form>
  );
};

export default WorkTeamMember;
