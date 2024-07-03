import React, {useRef} from 'react';
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
  const nodeRef = useRef(null);
    /**
   * The content variable holds the JSX element that will be rendered 
   * inside the side drawer. It includes a CSSTransition component 
   * that handles the slide-in animation.
   */
  return(
       
     /* The CSSTransition component is used to create a slide-in animation 
     * effect when the side drawer is opened or closed*/
    <CSSTransition
      in={props.show}
      timeout={300}
      classNames="slide-in-right"
      /** mounted or unmounted when the animation 
     * is triggered. */
      mountOnEnter 
      unmountOnExit
      nodeRef={nodeRef} /* Usar nodeRef aquí */

    >
     
      
       {/* * The aside element is the container element for the side drawer content.*/ }
      <aside ref={nodeRef} className="side-drawer" onClick={props.onClick}>
      <header>
           <h5>Menu</h5> {/* Título opcional del menú */}
         </header>
        {props.children}
      </aside>
    </CSSTransition>
  );
};

export default SideDrawer;

// // SideDrawer.js
// import React, { useRef } from 'react';
// import { CSSTransition } from 'react-transition-group';

// import './SideDrawer.css';

// const SideDrawer = props => {
//   const nodeRef = useRef(null);
  
//   return(
//     <CSSTransition
//       in={props.show}
//       timeout={300}
//       classNames="slide-in-right"
//       mountOnEnter 
//       unmountOnExit
//       nodeRef={nodeRef} /* Usar nodeRef aquí */
//     >
//       <aside ref={nodeRef} className="side-drawer" onClick={props.onClick}>
//         <header>
//           <h2>Menu</h2> {/* Título opcional del menú */}
//         </header>
//         <ul>
//           <li><a href="/link1">Link 1</a></li>
//           <li><a href="/link2">Link 2</a></li>
//           <li><a href="/link3">Link 3</a></li>
//         </ul>
//       </aside>
//     </CSSTransition>
//   );
// };

// export default SideDrawer;

