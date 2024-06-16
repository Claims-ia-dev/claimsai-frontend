import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import ClaimItem from './ClaimItem';
import Button from '../../shared/components/FormElements/Button';
import './ClaimList.css';

const ClaimList = props => {
  if (props.items.length === 0) {
    return (
      <div className="claim-list center">
        <Card>
          <h2>No claims found. Maybe create one?</h2>
          <Button to="/claims/new">Add new claim</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="claim-list">
      {props.items.map(claim => (
        <ClaimItem
          key={claim.id}
          id={claim.id}
          roomname={claim.roomname}
          roomtype={claim.roomtype}
          roomservice={claim.roomservice}
          // selectedquestions={claim.selectedquestions}
          creatorId={claim.creator}
          // customerId={claim.customerId}
        />
      ))}
    </ul>
  );
};

export default ClaimList;
