import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  useCallback,
} from "react";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import EditImg from "../../images/edit.svg";

import "./WorkTeam.css";

const DUMMY_MEMBERS = [
  //data the claim has
  {
    memberid: "u1",
    name: "karla",
    lastname: "Urrea",
    email: "karla@gmail.com",
    membership: "m1",
    phone: "66111067755",
  },
  {
    memberid: "u2",
    name: "arturo",
    lastname: "rodriguez",
    email: "arturo@gmail.com",
    membership: "m1",
    phone: "66311067755",
  },
];

function WorkTeam() {
  const membershipId = "m1";
  const loadedMembers = DUMMY_MEMBERS.filter(
    (member) => member.membership === membershipId
  ); //to change for a get api from backend
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null); // add this state to store the member being edited
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Initialize the form state with email and password inputs
   *
   * The useForm hook returns an array with three elements: formState, inputHandler, and setFormData.
   */
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      lastname: {
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

  const startEditHandler = useCallback(
    (member) => {
      setEditingMember(member);
      setIsEditing(true);
      inputHandler("name", member.name, true);
      inputHandler("lastname", member.lastname, true);
      inputHandler("email", member.email, true);
      inputHandler("phone", member.phone, true);
    },
    [inputHandler]
  );

  useEffect(() => {
    if (editingMember) {
      setFormData(
        {
          name: {
            value: editingMember.name,
            isValid: true,
          },
          lastname: {
            value: editingMember.lastname,
            isValid: true,
          },
          email: {
            value: editingMember.email,
            isValid: true,
          },
          phone: {
            value: editingMember.phone,
            isValid: true,
          },
        },
        true
      );
    }
  }, [editingMember, inputHandler]);

  const addSubmitHandler = (event) => {
    //handle in case of adding a new member
    event.preventDefault(); //this should connect to the backend
    console.log(formState.inputs);
  };

  const UpdateSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <Card className="workteam">
      <div className="workteam-member">
        <p>
          The following shows the number of users who are part of your work team
        </p>

        <div className="member-list-display">
          <ul className="member-list-items">
            {/* maps items array and renders members one by one */}
            {loadedMembers.map((member) => (
              <li className="member-item">
                <Card className="member-item__content">
                  <div className="member-item__info">
                    <h4>{member.name}</h4>
                  </div>

                  <div className="member-item__actions">
                    <button
                      className="member-item__button"
                      onClick={() => startEditHandler(member)}
                    >
                      <a>
                        {" "}
                        <img src={EditImg} alt="Edit button" />
                      </a>
                    </button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <form className="workteam-form" onSubmit={addSubmitHandler}>
        <p>
          {" "}
          Currently you can add ___ more users to your subcription.
          <a href="#">After the 10th user a fee of 10 USD will be charged </a>
        </p>{" "}
        <br />
        {/**Renders input*/}
        <div className="div workteam-form__inputs">
          <div className="split">
            <Input
              element="input"
              id="name"
              type="text"
              placeholder="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name"
              onInput={inputHandler}
              value={
                editingMember ? editingMember.name : formState.inputs.name.value
              }
            />

            <Input
              element="input"
              id="lastname"
              type="text"
              placeholder="Last Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid last name"
              onInput={inputHandler}
              value={
                editingMember
                  ? editingMember.lastname
                  : formState.inputs.lastname.value
              }
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
            value={
              editingMember ? editingMember.email : formState.inputs.email.value
            }
          />

          <Input
            element="input"
            id="phone"
            type="text"
            placeholder="Phone"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid phone number."
            onInput={inputHandler}
            value={
              editingMember ? editingMember.phone : formState.inputs.phone.value
            }
          />
        </div>
        <Button type="submit" disabled={!formState.isValid}>
          {isEditing ? "Edit member" : "Add new user"}
        </Button>
      </form>
    </Card>
  );
}

export default WorkTeam;
