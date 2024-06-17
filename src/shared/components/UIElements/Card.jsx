import React from 'react';

import './Card.css';

/**
 * The Card component is a reusable container component 
 * that can be used to wrap other components.
 * 
 * It accepts two props: 
 *  - className: a custom class name to be applied to the component
 *  - style: a custom style object to be applied to the component
 *  - children: the components to be rendered inside the Card
 */

const Card = props => {
  return (
     // Use template literial to concatenate the 'card' class with any additional classes from props.className
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
