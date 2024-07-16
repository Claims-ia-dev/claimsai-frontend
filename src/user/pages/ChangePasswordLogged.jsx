import React, { useContext, useEffect, useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_PASSWORD,
  
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Logo from "../../images/LogoClaimsIA.svg";
import "./Auth.css";

const ChangePasswordLogged = () => {
  //handles user aauthentication

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
const [successMessage, setSuccessMessage] = useState('');

  const [confirmed, setConfirmed]=useState(false);
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
  useEffect(() => {
    if (
      formState.inputs.newpassword.value === formState.inputs.confirmpassword.value
    ) {
      formState.isValid = true;
      setConfirmed(true);
    } else {
      formState.isValid = false;
      setConfirmed(false);
    }
  }, [formState,formState.inputs.newpassword, formState.inputs.confirmpassword]);

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
      //console.log(response);
      console.log("sent to server");
      if (response) {
        const message = response.message === "passwordd updated" ? "Password updated successfully!" : response.message;
  
        console.log("Password updated successfully!");
        setShowSuccessPopup(true);
      setSuccessMessage(message);

      } else {
        console.error("Error updating password:", response);
      }
    } catch (err) {
      console.error("Error updating password:", err);
    }
  };

  const successModal = (
    <Modal
      show={showSuccessPopup}
      onCancel={() => setShowSuccessPopup(false)}
      header="Update Successful"
      footer={<Button  onClick={() => setShowSuccessPopup(false)} to="/">Close</Button>}
    >
      <p>{successMessage}</p>
    </Modal>
  );

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
            validators={[VALIDATOR_PASSWORD()]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid || !confirmed}>
            Change Password
          </Button>
        </form>
        {!confirmed &&<p className='error'>Make sure the new password and confirm password fields match</p>}
        {successModal}
      </Card>
    </div>
  );
};

export default ChangePasswordLogged;
