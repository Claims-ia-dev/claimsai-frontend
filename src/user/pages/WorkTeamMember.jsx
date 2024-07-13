import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD,
  
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import "./WorkTeam.css";

const WorkTeamMember = ({ member, onSubmit, isEditing, onCancel }) => {
  const navigate = useNavigate();

  
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
          phone: {
            value: "",
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

  const submitHandler = async(event) => {
    event.preventDefault();   

    await onSubmit(member, formState.inputs);
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
        password: {
          value: "",
          isValid: false,
        },
      },
      false
    );
     
    navigate('/');
    navigate(-1);

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
              id="phone"
              type="text"
              placeholder="Phone"
              validators={[VALIDATOR_MINLENGTH(10)]}
              errorText="Please enter a valid phone number."
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
            <div className="split">
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
            </div>

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
              disabled={true} 
            />
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
