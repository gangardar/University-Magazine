import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const UpdateFaculty = ({ handleModalClose, modalState, handleModalSubmit, facultyData }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors, isDirty } } = useForm();

  useEffect(() => {
    reset({
      name: facultyData && facultyData.length > 0 ? facultyData[0].name : ''
    });
  }, [facultyData, reset]);

  return (
    <>
      <Modal show={modalState} onHide={handleModalClose} centered>
        <ModalHeader closeButton>
          <Modal.Title className="text-primary">Update Faculty</Modal.Title>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(handleModalSubmit)}>
            <Form.Group controlId="facultyName">
              <Form.Label className="font-weight-bold">Faculty Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Updated Faculty Name"
                {...register('name', { required: "Faculty's name is required!" })}
              />
            </Form.Group>            
            <ModalFooter>
              <Button type='submit' variant='success' disabled={!isDirty}>
                Submit
              </Button>
              <Button onClick={handleModalClose} variant='danger'>
                Close
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default UpdateFaculty;
