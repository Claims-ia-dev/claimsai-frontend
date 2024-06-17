import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

// This portal is used to render a div element with a className of "backdrop" 
// and an onClick event handler that is passed as a prop.
const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
   // The DOM node where the element will be rendered, identified by the id "backdrop-hook"
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
