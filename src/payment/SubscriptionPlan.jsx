import React, { useState, useContext } from "react";
import Card from "../shared/components/UIElements/Card";
import Button from "../shared/components/FormElements/Button";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import "./SubscriptionPlan.css";

function SubscriptionPlan() {
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

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    const price=plan.price
    const userId = auth.userId;
    const requestBody = {price, customerId: userId };
    sendRequest(
      "api/v1/create-subscription-checkout-session", //provisionalmente
      "POST",
      JSON.stringify(requestBody),
      {
        "Content-Type": "application/json",
      },
      auth.token
    )
     .then((response) => {
        const sessionUrl = response.session.url;
        window.location = sessionUrl;
      })
     .catch((error) => {
        console.log(error);
      });
  };
  

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
      </Card>
    </>
  );
}

export default SubscriptionPlan;
