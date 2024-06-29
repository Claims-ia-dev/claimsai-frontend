import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error?.code}</p>
      <p>{props.error}</p>
      <p>{props.error?.message}</p>
      {/* {props.error?.resendEmail && (
        <Button onClick={props.resendVerificationEmail}>
          Resend Verification Email
        </Button>
      )} */}

    </Modal>
  );
};

export default ErrorModal;
