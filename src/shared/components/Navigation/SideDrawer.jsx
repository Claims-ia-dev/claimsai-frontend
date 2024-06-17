import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

/**
 * The SideDrawer component is a reusable React component 
 * that renders a slide-in side drawer with a CSSTransition effect.
 * 
 * It takes two props: show and onClick. The show prop determines 
 * whether the side drawer is visible or not, and the onClick prop 
 * is a callback function that is called when the side drawer is clicked.
 */
const SideDrawer = props => {
    /**
   * The content variable holds the JSX element that will be rendered 
   * inside the side drawer. It includes a CSSTransition component 
   * that handles the slide-in animation.
   */
  const content = (
       
     /* The CSSTransition component is used to create a slide-in animation 
     * effect when the side drawer is opened or closed*/
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-right"
      /** mounted or unmounted when the animation 
     * is triggered. */
      mountOnEnter 
      unmountOnExit
    >
      
       {/* * The aside element is the container element for the side drawer content.*/ }
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );

    /**
   * The ReactDOM.createPortal method is used to render the side drawer 
   * content into a DOM node with the id "drawer-hook".
   */
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
