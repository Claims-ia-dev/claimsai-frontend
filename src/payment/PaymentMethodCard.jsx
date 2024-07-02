import React from 'react';
import Card  from '../shared/components/UIElements/Card';
import { FaCcMastercard, FaCcVisa,FaCcDiscover,FaCreditCard } from 'react-icons/fa';

import './PaymentMethodCard.css';

const PaymentMethodCard = ({ paymentMethod }) => {

  let brandIcon;
  switch (paymentMethod.brand) {
    case 'Visa':
      brandIcon = <FaCcMastercard/>;
      break;
    case 'Mastercard':
      brandIcon = <i className="fa fa-cc-mastercard" />;
      break;
    case 'American Express':
      brandIcon = <i className="fa fa-cc-amex" />;
      break;
    case 'Discover':
      brandIcon = <i className="fa fa-cc-discover" />;
      break;
    default:
      brandIcon = <i className="fa fa-credit-card" />; // default icon
  }

  return (
    <Card className="paycard">
      <h3>{brandIcon}{paymentMethod.brand}</h3>
      <p>Last 4 digits: {paymentMethod.last4}</p>
      <p>Expiration: {paymentMethod.exp_month}/{paymentMethod.exp_year}</p>
    </Card>
  );
};

export default PaymentMethodCard;