import React, { useState, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { CardContext } from "../../shared/context/CardContext";
import Button from "../../shared/components/FormElements/Button";
import './StripeStyles.css';

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
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

    //console.log("[PaymentMethod]", payload);
    addCard(payload.paymentMethod);

    // Send the payment method to server
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