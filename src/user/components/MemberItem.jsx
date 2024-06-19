import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import EditImg from  '../../images/edit.svg';
import DeleteImg from  '../../images/delete.svg';


//ClaimItem component that receives props usually from ClaimList to show each of the rooms that has a claim created
const MemberItem = props => { 
  //Gets the authentication context (Sees if it's login or not)
  const auth = useContext(AuthContext);

  //State to show or hide the confirmation modal (Appears when you want to delete)
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  //Handler to show modal that warns the user when trying to delete
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  //Handler to cancel the delete operation
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false); //cancels setting showConfirmModal to false and hides modal
  };

  //Handler to confirm the delete operation
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false); //Sets showConfirmModal to false so it hides the modal
    console.log('DELETING...'); 
  };

  return (
    <React.Fragment>      
   

      {/* Lists the item element, the room caracteristics in this case */}
      <li className="member-item">
        <Card className="member-item__content">          
          <div className="member-item__info">
            <h4>{props.name}</h4>
          </div>

          {/* section for user actions */}
          <div className="member-item__actions">
            {/* edit button-> will go to the route of the claim id to edit */}
              <button className="member-item__button" to={`/member/${props.id}`}>
               <a> <img src={EditImg} alt="Edit button" /></a>
              </button>
         
            
          
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default MemberItem;
