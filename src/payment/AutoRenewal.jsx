import React, { useState, useEffect } from "react";
import { useForm } from "../shared/hooks/form-hook";
import { Stripe } from 'stripe'; 
import Card from '../shared/components/UIElements/Card';
import Button from '../shared/components/FormElements/Button';
import PaymentMethodCard from './PaymentMethodCard';

const AutoRenewal = () => {
    const stripe = new Stripe('sk_test_IKYCHOAmUhC7IPTdaoVtO58D', {
        apiVersion: '2022-11-15',
      });

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [dateExpired, setDateExpired] = useState('2023-03-15'); // placeholder value
  const [pricePlan, setPricePlan] = useState(9.99); // placeholder value


  stripe.customers.create({
    email: 'karla@gmail.com',
    name: 'Karla Urrea',
  }).then(customer => {
   
    console.log('customer'+customer.id); 
  });
  
  useEffect(() => {
    // fetch payment methods from stripe
    stripe.paymentMethods.list({
      customer: 'cus_QKkTBGTLqJoIeo', // test customer ID
      type: 'card',
    }).then(response => {
      setPaymentMethods(response.data);
    });
  }, []);

  const handleSelectPaymentMethod = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const handleAddNewPaymentMethod = () => {
    // handle adding a new payment method (e.g., redirect to stripe payment form)
  };

  const testCards = [];

  useEffect(() => {
    stripe.tokens.create({
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2024,
        cvc: '123',
      },
      customer: 'cus_QKkTBGTLqJoIeo',
    }).then(response => {
        
      console.dir('object'+ response.id, { depth: null });
      const tokenid=response.id;
 
      //  token to create a payment method
      stripe.paymentMethods.create({
        type: 'card',
        card: {
            token: tokenid, // Pass the token ID
           
          },
        billing_details: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            address: {
              city: 'Anytown',
              country: 'US',
              line1: '123 Main St',
              line2: '',
              state: 'CA',
              postal_code: '12345'
            }}
      }).then(paymentMethod => {
        testCards.push(paymentMethod);
      });
    });
  
  
  }, []);

  return (
    <Card>
      <h2>Auto Renewal</h2>
      <p>
        Your subscription will automatically renew on {dateExpired} for ${pricePlan} dollars, and will be debited from this payment method:
      </p>
      <ul>
      <div>
    {testCards.map(paymentMethod => (
      <PaymentMethodCard key={paymentMethod.id} paymentMethod={paymentMethod} />
    ))}
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