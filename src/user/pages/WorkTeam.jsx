import React from "react";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,VALIDATOR_EMAIL
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import MemberList from "../components/MemberList";
import './WorkTeam.css';
  const DUMMY_MEMBERS = [ //data the claim has
  {  
    memberid: 'u1',
    name: 'karla',
    lastname: 'Urrea',
    email: 'karla@gmail.com',
    membership: 'm1',
    phone: '66111067755',   
  },
  {   
    memberid: 'u2',
    name: 'arturo',
    lastname: 'rodriguez',
    email: 'arturo@gmail.com',
    membership: 'm1',
    phone: '66311067755',   
  },
 
];

function WorkTeam() {

const membershipId = 'm1';
const loadedMembers = DUMMY_MEMBERS.filter(member => member.membership === membershipId); //to change for a get api from backend 

  /**
   * Initialize the form state with email and password inputs
   *
   * The useForm hook returns an array with three elements: formState, inputHandler, and setFormData.
   */
  const [formState, inputHandler] = useForm(
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

  const addSubmitHandler = (event) => {
    //handle in case of adding a new member
    event.preventDefault(); //this should connect to the backend
    console.log(formState.inputs);
  };

  return (
    <Card className="workteam">
      <div className="workteam-member">
        <MemberList items={loadedMembers}/>

      </div>
      <hr/>
      <form className="workteam-form" onSubmit={addSubmitHandler}>
        <p> Currently you can add ___ more users to your subcription. 
          <a href="#">After the 10th user a fee of 10 USD will be charged </a> 
        </p>{" "}
        <br />
        {/**Renders input*/}
        <div className="div workteam-form__inputs">
        <Input
          element="input"
          id="name"
          type="text"
          placeholder="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="lastname"
          type="text"
          placeholder="Last Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid last name"
          onInput={inputHandler}
        />
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
        /></div>
        <Button type="submit" disabled={!formState.isValid}>
          Add new user
        </Button>
      </form>
    </Card>
  );
}

export default WorkTeam;
