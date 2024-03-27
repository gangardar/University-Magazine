import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AlertDialog = ({ show, handleClose, message }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Title style={{marginLeft:'16px', marginTop:'12px'}}>Success!</Modal.Title>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer style={{ justifyContent: 'center' }}>
        <Button variant="success" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertDialog;