import React, {
  useState,
  useCallback,
  useContext, 
  useEffect
} from "react";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import EditImg from "../../images/edit.svg";
import DeleteImg from "../../images/delete.svg";
import WorkTeamMember from "./WorkTeamMember";

import "./WorkTeam.css";



function WorkTeam() {
  
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  const auth = useContext(AuthContext);
  const [loadedMembers, setLoadedMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(); // add this state to store the member being edited
  
  const [isEditing, setIsEditing] = useState(false);

  const fetchMembers = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/listuserpartner`,
        "GET",
        null,
        {},
        auth.token
      );
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

   }, [setEditingMember, setIsEditing] );


   const addSubmitHandler = async(member, formInfo) => {
    console.log(formInfo);
    try {    
      const formData = new URLSearchParams();
        formData.append('first_name', formInfo.first_name.value);
        formData.append('last_name', formInfo.last_name.value);
        formData.append('email', formInfo.email.value);
        formData.append('phone', formInfo.phone.value);
        formData.append('password', formInfo.password.value);        
        
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/adduserpartner`,
          'POST',
          formData.toString(),
          {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          auth.token
      );
      if(responseData){
        console.log("success");
        console.log(responseData);
        fetchMembers();        
        cancelEditHandler();
      }
        else {
          console.error("Error :", responseData);
      }
      //console.log(responseData); 
       
      } catch (err) {}
  };

  const updateSubmitHandler = async (member, formInfo) => {
    // handle updating an existing member
    try {
      const formData = new URLSearchParams();
      formData.append('user_id', member.id);
      formData.append('first_name', formInfo.first_name.value? formInfo.first_name.value : member.first_name);

      formData.append('last_name', formInfo.last_name.value? formInfo.last_name.value : member.last_name);

      formData.append('email', formInfo.email.value? formInfo.email.value : member.email);

      formData.append('phone', formInfo.phone.value? formInfo.phone.value : member.phone);

      
  
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/updateuserpartner`,
        'PUT',
        formData.toString(),
        {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth.token
      );
      if (responseData) {
        console.log('User updated successfully');
        console.log(responseData);
        fetchMembers();
        cancelEditHandler();
      } else {
        console.error('Error updating user');
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
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/deleteuserpartner`,
        "DELETE",
        new URLSearchParams({ user_id: memberid }),
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
  };


  return (
    <div className="workteam_page">
    <Card className="workteam">
        <p className="workteam_description">
          The following shows the number of users who are part of your work team
        </p>
        <div className="workteam_container">

      <div className="workteam-member">
      
        <div className="member-list-display">
          <ul className="member-list-items">
            {/* maps items array and renders members one by one */}
            {loadedMembers.map((member) => (
              <li key={member.id} className="member-item">
                <Card className="member-item__content">
                  <div className="member-item__info">
                    <h4>{member.first_name} {member.last_name}</h4>
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
      <WorkTeamMember
        member={editingMember? editingMember:""}
        onSubmit={isEditing ? updateSubmitHandler : addSubmitHandler}
        isEditing={isEditing}
        onCancel={cancelEditHandler}
      />;     
      </div>
      </div>
    </Card></div>
  );
}

export default WorkTeam;
