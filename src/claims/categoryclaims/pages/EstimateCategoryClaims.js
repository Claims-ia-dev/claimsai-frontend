import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryClaimList from '../components/CategoryClaimList';

const DUMMY_CATEGORY_CLAIMS = [ //dummy category claims to retrieve from backend
  {
    id: 'cc1',
    question: 'Water damage mitigation',
    description: 'includes all water mitigations actions/equipment',
    selected: 'true' ,     
    estimate: 'e1',
   // creator: 'u1'
  },
  {
    id: 'cc2',
    question: 'Contents Manipulation and Moving',
    description: 'Content manipulation',
    selected: 'false' ,     
    estimate: 'e1',
    //creator: 'u1'
  }
];
const EstimateCategoryClaims = () => {
  const estimateId = useParams().estimateId;//estimate id to retrieve from url
  const loadedClaims = DUMMY_CATEGORY_CLAIMS.filter(categoryClaim => categoryClaim.estimate === estimateId); //to change for a get api from backend for the category claims sorted by service type
  return <CategoryClaimList items={loadedClaims} />; //lists the category claims
};

export default EstimateCategoryClaims;
