import React, { useState} from 'react';
import Card from '../../shared/components/UIElements/Card';
import { Link } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import { useLocation } from 'react-router-dom';
import EmailVector from '../../images/emailvector.svg';
import './Auth.css';

function ValidateEmailReminder() {
  const location = useLocation();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSendEmail = async () => {
    try {
      //api to send email
      setMessage('Email sent successfully');
    } catch (error) {
      setError('Error sending email');
    }
  };
  return (
    <div className='auth-page'>
    <Card className="instructions">
    <div className='instructions__header'>
      <img className='instructions__image' src={EmailVector} alt="Email icon"/>
    </div>
    {location.state.email ? (<>
      <p className="center-text">Check your email: '{location.state.email}' inbox and verify to continue. </p>
      {/* <Button onClick={handleSendEmail}>Resend email</Button> */}
      <Link to="/auth">
      <Button size="wide">Login</Button>
      </Link>
      </>
    ) : (
      <p className="center-text">No email provided. Please go back and enter your email address.</p>
    )}
    {error && <p>{error}</p>}
    {message && <p>{message}</p>}
  </Card>
  </div>
  )
}

export default ValidateEmailReminder