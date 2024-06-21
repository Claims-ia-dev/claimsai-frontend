import React from 'react';
import Card  from '../shared/components/UIElements/Card';

const PaymentMethodCard = ({ paymentMethod }) => {
  return (
    <Card>
      <h3>{paymentMethod.cardholder_name} ({paymentMethod.brand})</h3>
      <p>Last 4 digits: {paymentMethod.last4}</p>
      <p>Expiration: {paymentMethod.exp_month}/{paymentMethod.exp_year}</p>
    </Card>
  );
};

export default PaymentMethodCard;