import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_PASSWORD,
  VALIDATOR_EQUAL,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Logo from "../../images/LogoClaimsIA.svg";
import "./Auth.css";

const ChangePasswordLogged = () => {
  //handles user aauthentication

  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext);

  /**
   * Initialize the form state with email and password inputs
   *
   * The useForm hook returns an array with three elements: formState, inputHandler, and setFormData.
   */
  const [formState, inputHandler] = useForm(
    {
      oldpassword: {
        value: "",
        isValid: false,
      },
      newpassword: {
        value: "",
        isValid: false,
      },
      confirmpassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const SubmitHandler = async (event) => {
    event.preventDefault(); //this should connect to the backend
    const data = {
      old_password: formState.inputs.oldpassword.value,
      new_password: formState.inputs.newpassword.value,
      new_password_confirm: formState.inputs.confirmpassword.value,
    };
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/changepassword`,
        "POST",
        JSON.stringify(data),
        {
          "Content-Type": "application/json",
        },
        auth.token
      );
      console.log(response);
      console.log("sent to server");
      if (response) {
        console.log("Password updated successfully!");

        navigate("/auth");
      } else {
        console.error("Error updating password:", response);
      }
    } catch (err) {
      console.error("Error updating password:", err);
    }
  };

  return (
    <div className="auth-page">
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <img className="authentication__logo" src={Logo} alt="ClaimsIA" />
        <br />
        <form onSubmit={SubmitHandler}>
          <Input
            element="input"
            id="oldpassword"
            type="password"
            placeholder="Old Password"
            validators={[VALIDATOR_PASSWORD()]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="newpassword"
            type="password"
            placeholder="New Password"
            validators={[VALIDATOR_PASSWORD()]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            validators={[VALIDATOR_EQUAL(formState.inputs.newpassword.value)]}
            errorText="Passwords do not match."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Change Password
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePasswordLogged;
