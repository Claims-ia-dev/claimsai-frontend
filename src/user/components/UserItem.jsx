import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => { //represents a user with  his id, name and claimscount
  return (
    //link text is the user's name  and the link url is dependant on the id of the user
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/claims`}>         
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.claimsCount} {props.claimsCount === 1 ? 'Claim' : 'Claims'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
