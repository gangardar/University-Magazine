import React, { useState } from 'react';
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function AddFaculty({handleModalSubmit}) {
   const[modalState, setModalState]=useState(false);

   const handleModalClose= () => {
    setModalState(!modalState);
   }

  const { register, handleSubmit, formState: { errors } } = useForm();  
  return (
    <>
    <Button onClick={handleModalClose} variant='success'>Add New</Button>     
    <Modal show={modalState} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Add New Faculty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleModalSubmit)}>
            <Form.Group controlId="facultyName">
              <Form.Label className="font-weight-bold">Faculty Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Faculty Name"
                {...register("facultyName", { required: true })}
              />
            </Form.Group>

            <Modal.Footer>
              <Button type='submit' variant='success'>
                Submit
              </Button>
              <Button onClick={handleModalClose} variant='danger'>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
    
  );
}