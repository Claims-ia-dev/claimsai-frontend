import React, { useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL
} from '../../shared/util/validators';
import EmailVector from '../../images/emailvector.svg';
import './Auth.css';

const ResetInstructions = (props) => {
  
  return (
    <Card className="authentication">
      <img className="authentication__logo" src={EmailVector} alt="ClaimsIA" />
      <br />
    
        
      <p>Check your  inbox  for instructions from us on how to reset your password</p> <br/>
     
    </Card>
  );
};

export default ResetInstructions;