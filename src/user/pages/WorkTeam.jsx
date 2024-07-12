import React, {
  useState,
  useCallback,
  useContext
} from "react";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import EditImg from "../../images/edit.svg";
import WorkTeamMember from "./WorkTeamMember";

import "./WorkTeam.css";

const DUMMY_MEMBERS = [
  //data the claim has
  {
    memberid: 1,
    first_name: "Rodrigo",
    last_name: "Perez",
    email: "rodrigo@gmail.com",
    membership: "m1",
    phone: "66111067755",
  },
  {
    memberid: 2,
    first_name: "Arturo",
    last_name: "Rodriguez",
    email: "arturo@gmail.com",
    membership: "m1",
    phone: "6633333333",
  },
  {
    memberid: 3,
    first_name: "Gerardo",
    last_name: "Lopez",
    email: "gerardo@gmail.com",
    membership: "m1",
    phone: "6633333333",
  },
];

function WorkTeam() {
  
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  const auth = useContext(AuthContext);
  
  const membershipId = "m1";
  const loadedMembers = DUMMY_MEMBERS.filter(
    (member) => member.membership === membershipId
  ); //to change for a get api from backend
  const [editingMember, setEditingMember] = useState(); // add this state to store the member being edited
  
  const [isEditing, setIsEditing] = useState(false);

   
const startEditHandler = useCallback(
  (member) => {
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
        console.log(responseData)
      }
        else {
          console.error("Error :", responseData);
      }
      //console.log(responseData); 
       
      } catch (err) {}
  };

  const updateSubmitHandler = (member, formData) => {
    // handle updating an existing member
    console.log(formData);
  };
  const cancelEditHandler = () => {
    setEditingMember(null);
    setIsEditing(false);
  };

  return (
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
              <li key={member.memberid} className="member-item">
                <Card className="member-item__content">
                  <div className="member-item__info">
                    <h4>{member.first_name}</h4>
                  </div>

                  <div className="member-item__actions">
                    <button
                      className="member-item__button"
                      onClick={() => startEditHandler(member)}
                    >                      
                        {" "}
                        <img src={EditImg} alt="Edit button" />
                      
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
    </Card>
  );
}

export default WorkTeam;
