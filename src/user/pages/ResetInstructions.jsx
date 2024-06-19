import React, { useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import { Link } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import { useLocation } from 'react-router-dom';
import {
  VALIDATOR_EMAIL
} from '../../shared/util/validators';
import EmailVector from '../../images/emailvector.svg';
import './ResetInstructions.css';


const ResetInstructions = () => {
  const location = useLocation();
  const { email } = location.state || {};

  return (
    <Card className="instructions">
        <div className='instructions__header'>
        <img className='instructions__image' src={EmailVector} alt="Email icon"/></div>
      {email ? (
        <p>Check your email: <Link to='/change-password'>{email}</Link> inbox for instructions from us on how to reset your password.</p>
      ) : (
        <p>No email provided. Please go back and enter your email address.</p>
      )}
    </Card>
  );
};

export default ResetInstructions;