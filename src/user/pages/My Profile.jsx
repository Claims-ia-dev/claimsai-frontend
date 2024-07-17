import React, { useEffect, useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./MyProfile.css";
import Modal from "../../shared/components/UIElements/Modal";

const MyProfile = () => {
  const auth = useContext(AuthContext);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
const [successMessage, setSuccessMessage] = useState('');
  const [loadedProfile, setLoadedProfile] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
      company_name: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      street: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      country: {
        value: "",
        isValid: false,
      },
      state: {
        value: "",
        isValid: false,
      },
      zip_code: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/getuser`,
          "GET",
          null,
          {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth.token
        );

        setLoadedProfile(responseData);
        setFormData(
          {
            first_name: {
              value: responseData.first_name ? responseData.first_name : "",

              isValid: responseData.first_name ? true : false,
            },
            last_name: {
              value: responseData.last_name ? responseData.last_name : "",

              isValid: responseData.last_name ? true : false,
            },
            company_name: {
              value: responseData.company_name ? responseData.company_name : "",

              isValid: responseData.company_name ? true : false,
            },
            phone: {
              value: responseData.phone ? responseData.phone : "",

              isValid: responseData.phone ? true : false,
            },
            street: {
              value: responseData.user_address[0]?.street
                ? responseData.user_address[0].street
                : "",

              isValid: responseData.user_address[0]?.street ? true : false,
            },

            city: {
              value: responseData.user_address[0]?.city
                ? responseData.user_address[0].city
                : "",

              isValid: responseData.user_address[0]?.city ? true : false,
            },
            country: {
              value: responseData.user_address[0]?.country
                ? responseData.user_address[0].country
                : "",

              isValid: responseData.user_address[0]?.country ? true : false,
            },
            state: {
              value: responseData.user_address[0]?.state
                ? responseData.user_address[0].state
                : "",

              isValid: responseData.user_address[0]?.state ? true : false,
            },
            zip_code: {
              value: responseData.user_address[0]?.zip_code
                ? responseData.user_address[0].zip_code
                : "",

              isValid: responseData.user_address[0]?.zip_code ? true : false,
            },
            email: {
              value: responseData.email ? responseData.email : "",

              isValid: responseData.email ? true : false,
            },
          },
          true
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserById();
  }, [sendRequest,  setFormData, auth.token]);

  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = {};
      for (const input in formState.inputs) {
        formData[input] = formState.inputs[input].value;
      }
      const jsonData = JSON.stringify(formData);

      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/updateuser`,
        "PUT",
        jsonData,
        {
          "Content-Type": "application/json",
        },
        auth.token
      );
      if (responseData) {
        // console.log("success"); 
        console.log(responseData);
        setShowSuccessPopup(true);
      setSuccessMessage(responseData.message);
       
      } else {
        console.error("Error :", responseData);
      }
      //console.log(responseData);
    } catch (err) {}
  };

  const successModal = (
    <Modal
      show={showSuccessPopup}
      onCancel={() => setShowSuccessPopup(false)}
      header="Update Successful"
      footer={<Button onClick={() => setShowSuccessPopup(false)}>Close</Button>}
    >
      <p>{successMessage}</p>
    </Modal>
  );

  if (!loadedProfile && !error) {
    return (
      <div className="center">
       {!loadedProfile  &&<Card>
          <h2>User info not found</h2>
        </Card>}
      </div>
    );
  }

  return (
    <>
      {" "}
      <ErrorModal error={error} onClear={clearError} />
      <div className="myprofile-page">
        <Card className="profile">
          {isLoading && <LoadingSpinner asOverlay />}
          
          <form className="profile" onSubmit={updateSubmitHandler}>
            <div className="titleContainer">
            <h2 className="intro">Personal information</h2>
          </div>
            <div className="section">
              <div className="split">
                <Input
                  element="input"
                  id="first_name"
                  type="text"
                  placeholder="First Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid name."
                  onInput={inputHandler}
                  initialValue={
                    loadedProfile?.first_name ? loadedProfile.first_name : ""
                  }
                  initialValid={loadedProfile?.first_name ? true : false}
                />
                <Input
                  element="input"
                  id="last_name"
                  type="text"
                  placeholder="Last Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid last name."
                  onInput={inputHandler}
                  initialValue={
                    loadedProfile?.last_name ? loadedProfile.last_name : ""
                  }
                  initialValid={loadedProfile?.last_name ? true : false}
                />
              </div>
              <div className="split">
                <Input
                  element="input"
                  id="phone"
                  type="text"
                  placeholder="Telephone number"
                  validators={[VALIDATOR_MINLENGTH(10)]}
                  errorText="Please enter a phone number."
                  onInput={inputHandler}
                  initialValue={loadedProfile?.phone ? loadedProfile.phone : ""}
                  initialValid={loadedProfile?.phone ? true : false}
                />
                <Input
                  element="input"
                  id="company_name"
                  type="text"
                  placeholder="Company Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid company name."
                  onInput={inputHandler}
                  initialValue={
                    loadedProfile?.company_name
                      ? loadedProfile.company_name
                      : ""
                  }
                  initialValid={loadedProfile?.company_name ? true : false}
                />
              </div>
              <Input
                element="input"
                id="street"
                type="text"
                placeholder="Street"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid street."
                onInput={inputHandler}
                initialValue={
                  loadedProfile?.user_address[0]?.street
                    ? loadedProfile?.user_address[0]?.street
                    : ""
                }
                initialValid={
                  loadedProfile?.user_address[0]?.street ? true : false
                }
              />
              <div className="split">
                <Input
                  element="input"
                  id="city"
                  type="text"
                  placeholder="City"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid city."
                  onInput={inputHandler}
                  initialValue={
                    loadedProfile?.user_address[0]?.city
                      ? loadedProfile.user_address[0].city
                      : ""
                  }
                  initialValid={
                    loadedProfile?.user_address[0]?.city ? true : false
                  }
                />
                <Input
                  element="input"
                  id="country"
                  type="text"
                  placeholder="Country"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid country."
                  onInput={inputHandler}
                  initialValue={
                    loadedProfile?.user_address[0]?.country
                      ? loadedProfile.user_address[0].country
                      : ""
                  }
                  initialValid={
                    loadedProfile?.user_address[0]?.country ? true : false
                  }
                />
              </div>
              <div className="split">
                <Input
                  element="input"
                  id="state"
                  type="text"
                  placeholder="State"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid state."
                  onInput={inputHandler}
                  initialValue={
                    loadedProfile?.user_address[0]?.state
                      ? loadedProfile.user_address[0].state
                      : ""
                  }
                  initialValid={
                    loadedProfile?.user_address[0]?.state ? true : false
                  }
                />
                <Input
                  element="input"
                  id="zip_code"
                  type="text"
                  placeholder="Zip/ Postal code"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid name."
                  onInput={inputHandler}
                  initialValue={
                    loadedProfile?.user_address[0]?.zip_code
                      ? loadedProfile?.user_address[0]?.zip_code
                      : ""
                  }
                  initialValid={
                    loadedProfile?.user_address[0]?.zip_code ? true : false
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
                initialValue={loadedProfile?.email ? loadedProfile.email : ""}
                initialValid={loadedProfile?.email ? true : false}
                disabled={true}
              />

              <div>
                <br />
                <Button type="submit" disabled={!formState.isValid} size="wide">
                  Edit Profile
                </Button>
              </div>
            </div>
          </form>
        </Card>
        {successModal}
      </div>
    </>
  );
};

export default MyProfile;
