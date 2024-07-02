import React, { useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { FaCcMastercard, FaCcVisa,FaCcDiscover,FaCreditCard, FaCcAmex } from 'react-icons/fa';

import { CardContext } from "../../shared/context/CardContext";
import './StripeStyles.css';

const CardList = () => {
  const { cards } = useContext(CardContext);
  const getBrandIcon = (brand) => {
    switch (brand) {
      case 'visa':
        return <FaCcVisa />;
      case 'mastercard':
        return <FaCcMastercard />;
      case 'american express':
        return <FaCcAmex />;
      case 'discover':
        return <FaCcDiscover />;
      default:
        return <FaCreditCard />; // default icon
    }
  };
  
 

  return (
    <React.Fragment>
      {cards.map((card, index) => {
        
        return (
            
          
          <div className="DisplaySavedCard" key={index}>
            {/* <img
              src={`/images/${brand}.svg`}
              alt={brand}
            {
              style={{ width: 24, height: 24, marginRight: 8 }}
            // /> */}
         <div className="icon">{ getBrandIcon(card.card.brand) }</div>
          
           <p> **** **** **** {card.card.last4} </p>
           
           
          </div>
        );
      })}
    </React.Fragment>
    
  )
};

export default CardList;