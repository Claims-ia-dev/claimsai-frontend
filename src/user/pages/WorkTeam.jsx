import React, {
  useState,
  useCallback,
} from "react";
import Card from "../../shared/components/UIElements/Card";

import EditImg from "../../images/edit.svg";
import WorkTeamMember from "./WorkTeamMember";

import "./WorkTeam.css";

const DUMMY_MEMBERS = [
  //data the claim has
  {
    memberid: 1,
    first_name: "karla",
    last_name: "Urrea",
    email: "karla@gmail.com",
    membership: "m1",
    phone: "66111067755",
  },
  {
    memberid: 2,
    first_name: "arturo",
    last_name: "rodriguez",
    email: "arturo@gmail.com",
    membership: "m1",
    phone: "6633333333",
  },
];

function WorkTeam(props) {
  
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


   const addSubmitHandler = (member, formData) => {
    // handle adding a new member
    console.log(formData);
  };

  const updateSubmitHandler = (member, formData) => {
    // handle updating an existing member
    console.log(formData);
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
      />;     
      </div>
        
    </Card>
  );
}

export default WorkTeam;
