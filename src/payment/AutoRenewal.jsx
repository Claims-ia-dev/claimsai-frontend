import React, { useState, useEffect, useContext } from "react";
import { useForm } from "../shared/hooks/form-hook";
import { Stripe } from "stripe";
import Card from "../shared/components/UIElements/Card";
import Button from "../shared/components/FormElements/Button";
import PaymentMethodCard from "./PaymentMethodCard";
import { AuthContext } from "../shared/context/auth-context";
import "./Autorenewal.css";

const AutoRenewal = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [dateExpired, setDateExpired] = useState("2023-03-15"); // placeholder value
  const [pricePlan, setPricePlan] = useState(9.99); // placeholder value

  const auth = useContext(AuthContext);
  console.log(auth.userinfo.stripe_customer_id);

  const handleAddNewPaymentMethod = () => {
    // handle adding a new payment method (e.g., redirect to stripe payment form)
  };

  return (
    <Card className="autorenewal">
      <div className="cards">
        <section>
        <p>
          Your subscription will automatically renew on {dateExpired} for $
          {pricePlan} dollars, and will be debited from this payment method:
        </p>
        <ul>
          <div>
            {/* {testCards.map(paymentMethod => (
      <PaymentMethodCard key={paymentMethod.id} paymentMethod={paymentMethod} />
    ))} */}
          </div>
        </ul>
        <Button onClick={handleAddNewPaymentMethod}>
          Add another payment method
        </Button>
        
        {selectedPaymentMethod && (
          <p>Selected payment method: {selectedPaymentMethod.card.brand}</p>
        )}</section>
        <Button>
          Save changes
        </Button>
      </div>
      <hr />
      <div className="plan">
        <section>
        <h1>Plan: </h1>
        <p>Start with our first and most groundbreaking product</p>
        <ul>
          <li>Create instant estimates with AI</li>
          <li>Early access to new features</li>
        </ul>

        <div className="check">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <p>Automatic renewal</p></div>
        <p className="">
          You have <a>3 members</a> in your team
        </p>
        </section>
        <Button inverse>
          Manage team
        </Button>
      </div>
    </Card>
  );
};

export default AutoRenewal;
