import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { formatDateToYYYYMMDD } from '../../dateUtil';
import { useForm } from 'react-hook-form';

const AddTerm = ({ handleModalSubmit }) => {
    const [modalState, setModalState] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm();

  const handleModalClose = () => {
    setModalState(false);
    // Reset form state on close
    reset();
  };

  const handleDateChange = (date, fieldName) => {
    setValue(fieldName, date, { shouldValidate: true });
  }

  return (
    <>
       <Button onClick={() => setModalState(true)} variant='success'>Add New</Button>
      <Modal show={modalState} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Add New Term</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  selected={getValues("startDate")}
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
                  selected={getValues("lastSubmitDate")}
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
                  selected={getValues("endDate")}
                  onChange={(date) => handleDateChange(date, "endDate")}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  required
                />
                {errors.endDate && <span className="text-danger">End Date is required</span>}
              </Form.Group>
            </div>

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
};

export default AddTerm;
