import React, {  useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { CardContext } from "../../shared/context/CardContext";
import Button from "../../shared/components/FormElements/Button";
import './StripeStyles.css';



const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
 // const options = useOptions();
  const { addCard } = useContext(CardContext); 

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    //console.log("[PaymentMethod]", payload);
    addCard(payload.paymentMethod);
    
    
// Send the payment method to  server
       

    

  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <CardElement
          //options={options}
        //   onReady={() => {
        //     console.log("CardElement [ready]");
        //   }}
        //   onChange={event => {
        //     console.log("CardElement [change]", event);
        //   }}
        //   onBlur={() => {
        //     console.log("CardElement [blur]");
        //   }}
        //   onFocus={() => {
        //     console.log("CardElement [focus]");
        //   }}
        />
      </label>
      <Button type="submit" disabled={!stripe}>
        Add Payment Method
      </Button>
    </form>
  );
};

export default CardForm;