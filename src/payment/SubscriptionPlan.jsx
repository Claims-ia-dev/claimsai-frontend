import React, { useState, useContext, useEffect } from "react";
import Stripe from "stripe";
import Card from "../shared/components/UIElements/Card";
import Button from "../shared/components/FormElements/Button";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import Success from "./Success";
import "./SubscriptionPlan.css";
import { useNavigate } from "react-router-dom";

function SubscriptionPlan() {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  const dummySubscriptions = [
    {
      id: 1,
      name: "Essentials Plan",
      description: "Start with our first and most groundbreaking product",
      price: 25,
      features: ["Instant estimates", "Early features"],
    },
    {
      id: 2,
      name: "Annual plan",
      description: "For those serious about supercharging their estimates",
      price: 21,
      features: ["CRM Access", "Priority Support", "Extra Features"],
    },
  ];

  const { sendRequest, error, isLoading } = useHttpClient(); // Use the hook


  const auth = useContext(AuthContext);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

 

  const handlePlanSelect = async (plan) => {
    setSelectedPlan(plan);
    const price = plan.price;
    const userId = auth.userId;
    const requestBody = { price, customerId: userId };
    try {
      const response = await sendRequest(
        `/api/users/create-checkout-session`,
        "POST",
        null,
        // {stripeApiKey: process.env.REACT_APP_STRIPE_API_KEY},
        { "Content-Type": "application/json" },
        auth.token
      );
      console.log('response to request')
      console.log(response.url);    
      window.open(response.url, '_blank');
     
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);
  return (
    <>
      <Card className="subscriptions">
        <h4>Choose a plan that suits your business needs</h4>
        <h2>Ready to get started?</h2>
        <div className="subscriptions__cards">
          {dummySubscriptions.map((plan) => (
            <Card className="plan_card" key={plan.id}>
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              <span>
                <h2>${plan.price}</h2>
                <p>/month</p>
              </span>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Button onClick={() => handlePlanSelect(plan)}>
                Select Plan
              </Button>
            </Card>
          ))}
        </div>
        {selectedPlan && (
          <div>
            <h3>You have selected: {selectedPlan.name}</h3>
            <p>Price: ${selectedPlan.price}/month</p>
          </div>
        )}

    {success && sessionId !== '' ? (
      <Success sessionId={sessionId} />
    ) : (
      <Message message={message} />
    )}
      </Card>
      
    </>
  );
}

export default SubscriptionPlan;