import React, { useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { useLocation } from 'react-router-dom';
import EmailVector from '../../images/emailvector.svg';
import './ResetInstructions.css';


const ResetInstructions = () => {  
  const location = useLocation();
  const email = useState(`${location.state.email }`);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  // setEmail(location.state.email || {});
  

  const handleSendEmail = async () => {
    try {
      //api to send email
      setMessage('Email sent successfully');
    } catch (error) {
      setError('Error sending email');
    }
  };

  return (
    <Card className="instructions">
    <div className='instructions__header'>
      <img className='instructions__image' src={EmailVector} alt="Email icon"/>
    </div>
    {email ? (<>
      <p>Check your email: {email} inbox for instructions from us on how to reset your password.</p>
      <Button onClick={handleSendEmail}>Resend email</Button></>
    ) : (
      <p>No email provided. Please go back and enter your email address.</p>
    )}
    {error && <p>{error}</p>}
    {message && <p>{message}</p>}
  </Card>
  );
};

export default ResetInstructions;