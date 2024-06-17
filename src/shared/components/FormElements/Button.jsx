import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = props => {
  //checks if there's href provided
  if (props.href) {
    //return an anchor element with the href
    return (
      <a
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'}`}
        href={props.href}
      >
        {/* button content */}
        {props.children} 
      </a>
    );
  }

  //checks if the to prop is provided if true a link is returned if false a button
  if (props.to) {
    // returns a link component from react-router-dom
    return (
      <Link
        to={props.to}
        className={`button button--${props.size || 'default'} ${props.inverse &&
          'button--inverse'} ${props.danger && 'button--danger'}`}
      >
        {/* button content */}
        {props.children}
      </Link>
    );
  }
  return (
    //returns button
    <button
      className={`button button--${props.size || 'default'} ${props.inverse &&
        'button--inverse'} ${props.danger && 'button--danger'}`}
      type={props.type}
      // props of what happens onclick
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {/* button content */}
      {props.children}
    </button>
  );
};

export default Button;
