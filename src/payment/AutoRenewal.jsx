import React, { useState, useEffect } from "react";
import { useForm } from "../shared/hooks/form-hook";
import { Stripe } from 'stripe'; 
import Card from '../shared/components/UIElements/Card';
import Button from '../shared/components/FormElements/Button';
import PaymentMethodCard from './PaymentMethodCard';

const AutoRenewal = () => {
    // const stripe = new Stripe('sk_test_IKYCHOAmUhC7IPTdaoVtO58D', {
    //     apiVersion: '2022-11-15',
    //   });

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [dateExpired, setDateExpired] = useState('2023-03-15'); // placeholder value
  const [pricePlan, setPricePlan] = useState(9.99); // placeholder value


  

  const handleAddNewPaymentMethod = () => {
    // handle adding a new payment method (e.g., redirect to stripe payment form)
  };

 
  return (
    <Card>
      <h2>Auto Renewal</h2>
      <p>
        Your subscription will automatically renew on {dateExpired} for ${pricePlan} dollars, and will be debited from this payment method:
      </p>
      <ul>
      <div>
    {/* {testCards.map(paymentMethod => (
      <PaymentMethodCard key={paymentMethod.id} paymentMethod={paymentMethod} />
    ))} */}
  </div>
      </ul>
      <Button onClick={handleAddNewPaymentMethod}>Add New Payment Method</Button>
      {selectedPaymentMethod && (
        <p>Selected payment method: {selectedPaymentMethod.card.brand}</p>
      )}
    </Card>
  );
};

export default AutoRenewal;