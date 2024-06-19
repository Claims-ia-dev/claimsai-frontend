import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import ClaimItem from './ClaimItem';
import Button from '../../shared/components/FormElements/Button';
import './ClaimList.css';
import { Link } from 'react-router-dom';

const ClaimList = props => { //Component that receives props expected from UserClaims 
  if (props.items.length === 0) { //checks if the array of claims is empty
    return (
      <div className="claim-list center">
        <Card>
          <h2>No claims for rooms found. Do you want to create one?</h2>
          {/* Button tha goes to the route for creating a new claim */}
          <Button to="/claims/new">Add new room</Button> 
        </Card>
      </div>
    );
  }

  //returns list of ClaimItem components with the attributes of each claim
  return (
    <div className='claim-list-display'>
    <ul className="claim-list-items">
      {/* maps items array and renders a ClaiItem for each item */}
      {props.items.map(claim => (
        <ClaimItem
        // unique key
          key={claim.id}
          //Claim ID
          id={claim.id}
          roomname={claim.roomname}
          // selectedquestions={claim.selectedquestions} //questions selected for the claim
          creatorId={claim.creator} //user creating this claim
          // customerId={claim.customerId} //customer of this claim
        />
      ))}
      
    </ul>
    <div className='claim-list-buttons'>
    <Link className="claim-list-button filled-white" to="/claims/new">Add new room</Link> 
    <Link className="claim-list-button filled-blue" to="/">Calculate estimate</Link> 
    </div>

    </div>
  );
};

export default ClaimList;
