import React, { useState, useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import EditImg from "../../images/edit.svg";
import DeleteImg from "../../images/delete.svg";
import WorkTeamMember from "./WorkTeamMember";

import "./WorkTeam.css";
import Button from "../../shared/components/FormElements/Button";
import { Link } from "react-router-dom";

function WorkTeam() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [unidentifiedError, setUnidentifiedError] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [usersAvailable, setUsersAvailable] = useState(0);

  const auth = useContext(AuthContext);
  const [loadedMembers, setLoadedMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(); // add this state to store the member being edited

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/listproducts`,
          "GET",
          null,
          { "Content-Type": "application/json" },
          auth.token
        );
        setProducts(response); // update products state with API response

        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [sendRequest, auth.token]);

  useEffect(() => {
    const fetchSubscriptionId = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/mysubscriptions`,
          "GET",
          null,
          { "Content-Type": "application/json" },
          auth.token
        );
        const subscriptionData = await response;
        // console.log(subscriptionData);
        if (subscriptionData.length > 0) {
          if (products.length > 0) {
            // <--- Add this check
            const matchingProduct = products.find(
              (product) => product.default_price === subscriptionData[0].plan.id
            );
            //   console.log(matchingProduct);
            setCurrentProduct(matchingProduct);
            const restingUsers = matchingProduct.metadata?.users_n
              ? matchingProduct.metadata?.users_n - loadedMembers.length
              : 0;
            setUsersAvailable(restingUsers);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSubscriptionId();
  }, [auth.token, sendRequest, products, loadedMembers]);

  const fetchMembers = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/listuserpartner`,
        "GET",
        null,
        {},
        auth.token
      );
      //console.log(responseData);
      setLoadedMembers(responseData);
    } catch (err) {
      console.error(err);
    }
  }, [sendRequest, auth.token]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const startEditHandler = useCallback(
    async (member) => {
      await cancelEditHandler();
      setEditingMember(member);
      setIsEditing(true);
    },
    [setEditingMember, setIsEditing]
  );

  const addSubmitHandler = async (formInfo) => {
    console.log(formInfo);
    try {
      const formData = new URLSearchParams();
      formData.append("first_name", formInfo?.first_name.value);
      formData.append("last_name", formInfo?.last_name.value);
      formData.append("email", formInfo?.email.value);
      formData.append("phone", formInfo?.phone.value);
      formData.append("password", formInfo?.password.value);

      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/adduserpartner`,
        "POST",
        formData.toString(),
        {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth.token
      );
      if (responseData) {
        console.log("success");
        console.log(responseData);
        navigate("/");
        navigate(-1);
        fetchMembers();
        cancelEditHandler();
      } else {
        setUnidentifiedError(responseData);

        console.error("Error :", responseData);
      }
      //console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const updateSubmitHandler = async (member, formInfo) => {
    // handle updating an existing member
    try {
      const formData = new URLSearchParams();
      formData.append("user_id", member.id);
      formData.append(
        "first_name",
        formInfo.first_name.value
          ? formInfo.first_name.value
          : member.first_name
          ? member.first_name
          : ""
      );

      formData.append(
        "last_name",
        formInfo.last_name.value
          ? formInfo.last_name.value
          : member.last_name
          ? member.last_name
          : ""
      );

      formData.append(
        "email",
        formInfo.email.value
          ? formInfo.email.value
          : member.email
          ? member.email
          : ""
      );

      formData.append(
        "phone",
        formInfo.phone.value
          ? formInfo.phone.value
          : member.phone
          ? member.phone
          : ""
      );

      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/updateuserpartner`,
        "PUT",
        formData.toString(),
        {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth.token
      );
      if (responseData) {
        console.log("User updated successfully");
        console.log(responseData);
        fetchMembers();
        cancelEditHandler();
      } else {
        console.error("Error updating user");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const cancelEditHandler = () => {
    setEditingMember(null);
    setIsEditing(false);
  };

  const handleDelete = async (memberid) => {
    setMemberToDelete(memberid);
    setShowDeleteModal(true);
  };

  const confirmDeleteHandler = async () => {
    // console.log("memberToDelete");
    // console.log(memberToDelete);
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/deleteuserpartner`,
        "DELETE",
        new URLSearchParams({ user_id: memberToDelete }),
        {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth.token
      );
      console.log(response);

      fetchMembers();
    } catch (error) {
      console.error(error);
    }
    setShowDeleteModal(false);
  };

  const cancelDeleteHandler = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="workteam_page">
      <ErrorModal error={error} onClear={clearError} />
      {unidentifiedError && (
        <ErrorModal error={unidentifiedError} onClear={clearError} />
      )}
      {isLoading && <LoadingSpinner asOverlay />}
      <Card className="workteam">
        <div className="workteam_container">
          <div className="workteam-member">
            <p className="workteam_description">
              The following shows the number of users who are part of your work
              team
            </p>
            <div className="member-list-display">
              <ul className="member-list-items">
                {/* maps items array and renders members one by one */}
                {loadedMembers.map((member) => (
                  <li key={member.id} className="member-item">
                    <Card className="member-item__content">
                      <div className="member-item__info">
                        <h4>
                          {member.first_name} {member.last_name}
                        </h4>
                      </div>

                      <div className="member-item__actions">
                        <button
                          className="member-item__button"
                          onClick={() => startEditHandler(member)}
                        >
                          {" "}
                          <img src={EditImg} alt="Edit button" />
                        </button>
                        <button
                          className="member-item__button"
                          onClick={() => handleDelete(member.id)}
                        >
                          <img src={DeleteImg} alt="Delete button" />
                        </button>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr />

          <div className="workteam-form">
            <p className="workteam_limit_description">
              Currently,{" "}
              <span className="highlight">you can add {usersAvailable} </span>{" "}
              more {usersAvailable < 2 ?  "user " : "users "}
              to your subscription.
              <Link to="/subscription">
                {" "}
                After the{" "}
                {currentProduct?.metadata?.users_n
                  ? currentProduct.metadata.users_n
                  : 0}{" "}
                user your subscription plan would need to be upgraded
              </Link>
            </p>
            <WorkTeamMember
              member={editingMember ? editingMember : ""}
              onSubmit={isEditing ? updateSubmitHandler : addSubmitHandler}
              isEditing={isEditing}
              onCancel={cancelEditHandler}
              usersAvailable={usersAvailable}
            />
          </div>
        </div>
        {showDeleteModal && (
          <Modal
            onCancel={cancelDeleteHandler}
            header="Are you sure?"
            show={showDeleteModal}
          >
            <p>
              Do you want to proceed and delete this member of your workteam?
              Please note that it can't be undone thereafter.
            </p>

            <Button inverse className="btn" onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button
              danger
              className="btn btn-danger"
              onClick={confirmDeleteHandler}
            >
              Delete
            </Button>
          </Modal>
        )}
      </Card>
    </div>
  );
}

export default WorkTeam;
