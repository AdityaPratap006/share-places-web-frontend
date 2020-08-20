import React from 'react';

import Modal from '../Modal/Modal';
import Button from '../FormElements/Button';

interface ErrorModalProps {
  onClear: () => void;
  error: string | undefined;
}

const ErrorModal: React.FC<ErrorModalProps> = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footerContent={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
