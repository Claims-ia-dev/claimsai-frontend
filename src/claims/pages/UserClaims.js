import React from 'react';
import { useParams } from 'react-router-dom';

import ClaimList from '../components/ClaimList';

const DUMMY_CLAIMS = [
  {
    id: 'e1',
    roomname: 'Room 1',
    roomtype: '2',
    roomservice: 'cleaning',
    // selectedquestions: ['1', '2'] ,     
    creator: 'u1'
    // customer: 'cu1'
  },
  {
    id: 'e2',
    roomname: 'Room 2',
    roomtype: '3',
    roomservice: 'painting',
    // selectedquestions: ['2', '4'] ,     
    creator: 'u1'
    // customer: 'cu1'
  }
];
const UserClaims = () => {
  const userId = useParams().userId;
  const loadedClaims = DUMMY_CLAIMS.filter(claim => claim.creator === userId); //to change for a get api from backend 
  return <ClaimList items={loadedClaims} />;
};

export default UserClaims;
