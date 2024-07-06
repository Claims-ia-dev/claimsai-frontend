import React, { useState, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { CardContext } from "../../shared/context/CardContext";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import './StripeStyles.css';

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const auth = useContext(AuthContext);
  const { sendRequest,  isLoading } = useHttpClient(); 
  const email=auth.userinfo.email;
  const { addCard } = useContext(CardContext);

  const [cardError, setCardError] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement.isEmpty) {
      setCardError("Please fill in your card details");
      return;
    }

    setCardError(null);

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement
    });

    console.log("[PaymentMethod]", payload);
   

     // Send the payment method to the backend
     try {
      console.log(auth.userinfo);
      console.log(email);
      console.log(payload.paymentMethod);
      console.log(payload.paymentMethod.id);
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/addcard`,
        "POST",
        JSON.stringify({
           email: email,
           tokenCard: payload.paymentMethod.id
           }),
       { "Content-Type": "application/json" },
        auth.token
      );      
    
      if (response.ok) {
        addCard(payload.paymentMethod);
        console.log("Card added successfully!");
      } else {
        console.error("Error adding card:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <CardElement
          onChange={event => {
            if (event.error) {
              setCardError(event.error.message);
            } else {
              setCardError(null);
            }
          }}
        />
        {cardError && <div style={{ color: "red" }}>{cardError}</div>}
      </label>
      <Button type="submit" disabled={!stripe || cardError}>
        Add Payment Method
      </Button>
    </form>
  );
};

export default CardForm;