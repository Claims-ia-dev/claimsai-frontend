import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import MemberItem from './MemberItem';

const MemberList = props => { //Component that receives props expected from UserClaims 
  if (props.items.length === 0) { //checks if the array of claims is empty
    return (
      <div className="member-list center">
        <Card>
          <h2>No members found. </h2>     
        </Card>
      </div>
    );
  }

  //returns list of ClaimItem components with the attributes of each claim
  return (
    <div className='member-list-display'>
    <ul className="member-list-items">
      {/* maps items array and renders a MemberItem for each item */}
      {props.items.map(member => (
        <MemberItem      
          key={member.id}         
          id={member.id}
          name={member.name}
          lastname={member.lastname}
          email={member.email}
          phone={member.phone}
          membership={member.membership} 
        />
      ))}
      
    </ul>  

    </div>
  );
};

export default MemberList;
