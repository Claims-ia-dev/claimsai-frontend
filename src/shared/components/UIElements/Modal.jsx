import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

/**
 * The ModalOverlay component is a reusable component 
 * that renders the content of the modal.
 * 
 * It accepts several props: 
 *  - className: a custom class name to be applied to the modal
 *  - style: a custom style object to be applied to the modal
 *  - header: the header text of the modal
 *  - headerClass: a custom class name to be applied to the modal header
 *  - onSubmit: a function to be called when the form is submitted
 *  - onCancel: a function to be called when the backdrop is clicked
 *  - children: the content of the modal
 *  - footer: the footer of the modal
 *  - footerClass: a custom class name to be applied to the modal footer
 *  - contentClass: a custom class name to be applied to the modal content
 */
const ModalOverlay = props => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

/**
 * The Modal component is a reusable component 
 * that renders the modal overlay and the backdrop.
 * 
 * It accepts several props: 
 *  - show: a boolean indicating whether the modal should be shown
 *  - onCancel: a function to be called when the backdrop is clicked
 *  - All the props accepted by the ModalOverlay component
 */

const Modal = props => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
