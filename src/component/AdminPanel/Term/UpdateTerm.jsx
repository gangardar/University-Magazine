import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { useForm, useFormState } from 'react-hook-form';
import { formatDate } from '../../dateUtil';

const UpdateTerm = ({ handleModalClose, modalState, handleModalSubmit, termData }) => {
    const defaultData = termData && termData.length > 0 ? termData[0] : {};
    const { register, setValue, handleSubmit, reset, formState: { errors }, getValues } = useForm({ defaultValues: defaultData });

    const handleDateChange = (date, fieldName) => {
        setValue(fieldName, date, { shouldValidate: true });
      }

  useEffect(() => {
    reset(defaultData);
  }, [termData, reset]);

  return (
    <>
      <Modal show={modalState} onHide={handleModalClose} centered>
        <ModalHeader closeButton>
          <Modal.Title className="text-primary">Update Term</Modal.Title>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(handleModalSubmit)}>
          <Form.Group controlId="name" className='mb-3'>
              <Form.Label className="font-weight-bold">Term Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Term's Name"
                {...register("name", { required: true })}
                autoFocus
              />
              {errors.name && <span className="text-danger">Name is required</span>}
            </Form.Group>

            <div className="d-flex justify-content-between mb-3">
              <Form.Group controlId="startDate">
                <Form.Label className="font-weight-bold">Start Date</Form.Label>
                <ReactDatePicker
                  selected={formatDate(getValues("startDate")) }
                  onChange={(date) => handleDateChange(date, "startDate")}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  required
                />
                {errors.startDate && <span className="text-danger">Start Date is required</span>}
              </Form.Group>

              <Form.Group controlId="lastSubmitDate" className='mx-2'>
                <Form.Label className="font-weight-bold">Last Submit Date</Form.Label>
                <ReactDatePicker
                  selected={formatDate(getValues("lastSubmitDate"))}
                  onChange={(date) => handleDateChange(date, "lastSubmitDate")}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  required
                />
                {errors.lastSubmitDate && <span className="text-danger">Last Submit Date is required</span>}
              </Form.Group>

              <Form.Group controlId="endDate">
                <Form.Label className="font-weight-bold">End Date</Form.Label>
                <ReactDatePicker
                  selected={formatDate(getValues("endDate"))}
                  onChange={(date) => handleDateChange(date, "endDate")}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  required
                />
                {errors.endDate && <span className="text-danger">End Date is required</span>}
              </Form.Group>
            </div>
            <ModalFooter>
              <Button type='submit' variant='success'>
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

export default UpdateTerm;
