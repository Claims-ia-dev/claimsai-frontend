import React, { useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';
import { useLocation } from 'react-router-dom';
import EmailVector from '../../images/emailvector.svg';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ResetInstructions.css';


const ResetInstructions = () => {  
  const location = useLocation();
  const email = useState(`${location.state.email }`);
 
  const [message, setMessage] = useState(null);
  
  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  // setEmail(location.state.email || {});
  

  const handleSendEmail = async (event) => {
    event.preventDefault();
    // To call the reset password function here

     try {
   const formData = new URLSearchParams();
   formData.append('email', email);

   const responseData = await sendRequest(
     `${process.env.REACT_APP_BACKEND_URL}/api/users/recoverypassword`,
     'POST',
     formData.toString(),
     {
       'Content-Type': 'application/x-www-form-urlencoded'
     }
     );
     if(responseData.token){
      console.log("success");
     }
     setMessage('Email sent successfully');
     } catch (err) {
      setMessage('Error sending email');
     console.log(err);
   
   }
 
  };

  return (
    <div className="reset_page">
    <Card className="instructions">
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
      {isLoading && <LoadingSpinner asOverlay />}
    <div className='instructions__header'>
      <img className='instructions__image' src={EmailVector} alt="Email icon"/>
    </div>
    <div className='instructions__body'>
    {email ? (<>
      <p>Check your email: {email} <br/>for instructions from us on how to reset your password.</p>
      <Button onClick={handleSendEmail}>Resend email</Button></>
    ) : (
      <p>No email provided. Please go back and enter your email address.</p>
    )}
    {message && <p>{message}</p>}</div>
  </Card></div>
  );
};

export default ResetInstructions;