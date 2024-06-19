import React from 'react';
import { useParams } from 'react-router-dom';

import ClaimList from '../components/ClaimList';

const DUMMY_CLAIMS = [ //data the claim has
  {
    id: 'e1',
    customername: 'karla',
    phonenumber: '66111067755',
    address: 'Benito 23',
    city: 'Tijuana',
    state: 'BC',
    zip:'22710',
    insurance: '123',
    email: 'karla@gmail.com',
    roomname: 'Room 1',
    roomtype: '2',
    roomservice: 'cleaning',
    // selectedquestions: ['1', '2'] ,     
    creator: 'u1'
    // customer: 'cu1'
  },
  {
    id: 'e2',
    customername: 'beto',
    phonenumber: '66411067755',
    address: 'Benito 24',
    city: 'Tijuana',
    state: 'BC',
    zip:'22710',
    insurance: '1234',
    email: 'beto@gmail.com',
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
