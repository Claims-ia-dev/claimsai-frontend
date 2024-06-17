import React, { useState, useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import './ClaimItem.css';

//ClaimItem component that receives props usually from ClaimList to show each of the rooms that has a claim created
const ClaimItem = props => { 
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
      <Modal //Modal component to display the confirmation message
        show={showConfirmModal} //shows the confirmation modal based on this state
        onCancel={cancelDeleteHandler} //handler to cancel delete operation
        header="Are you sure?" //header text for the modal
        footerClass="claim-item__modal-actions"
        footer={ //footer content with cancel and delete buttons
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>{/* cancel button -> calls cancel handler*/}
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>  {/*Delete button ->calls confirmation handler*/}
              DELETE
            </Button>
          </React.Fragment>
        }
      >
         <p>{/* message to display in modal */}
          Do you want to proceed and delete this claim? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>

      {/* Lists the item element, the room caracteristics in this case */}
      <li className="claim-item">
        <Card className="claim-item__content">          
          <div className="claim-item__info">
            <h2>{props.roomname}</h2>
            <h3>{props.roomtype}</h3>
            <p>{props.roomservice}</p>
          </div>

          {/* section for user actions */}
          <div className="claim-item__actions">
            {/* edit button-> will go to the route of the claim id to edit */}
              <Button to={`/claims/${props.id}`}>EDIT</Button>
         
              {/* delete button */}
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
          
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ClaimItem;
