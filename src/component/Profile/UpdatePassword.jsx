import { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useUpdatePassword from '../../services/Queries/User/useUpdatePassword';
import endpointService from "../../services/mm-endpoint-service";

function UpdatePassword({ id }) {
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();
  // const { mutate } = useUpdatePassword();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (data) => {
    endpointService.changePassword(id, data) 
    .then(()=>{
      console.log("successfully password changed!")
    }).catch((err) => {
      console.log(err);
    })
    console.log(data);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Change Password
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="UpdatePasswordForm.ControlInput1">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your current password"
                autoFocus
                {...register('currentPassword', { required: 'Current password is required' })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="UpdatePasswordForm.ControlInput2">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                {...register('newPassword', { required: 'New password is required' })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdatePassword;
