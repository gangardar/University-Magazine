import { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import SuccessMessage from '../Feedback/SuccessMessage';
import ErrorMessage from '../Feedback/ErrorMessage';
import useUpdateEmail from '../../services/Queries/User/useUpdateEmail';

function UpdateEmail({ user }) {
  const [show, setShow] = useState(false);
  const userData = user ? user : {};
  const { register, handleSubmit } = useForm({defaultValues: {userData}});

  const { mutateAsync: updateEmail, isError : isPasswordUpdateError,
     isSuccess : isPasswordUpdateSuccess, error : passwordUpdateError } = useUpdateEmail();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (data) => {
    console.log(data);
    const id = userData?.id;
    updateEmail({data, id});
    handleClose();
  };

  return (
    <>
    {isPasswordUpdateSuccess && <SuccessMessage message={"Password has been updated!"} />}
    {isPasswordUpdateError && <ErrorMessage message={passwordUpdateError} />}

      <Button variant="primary" onClick={handleShow}>
        Change Email
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="UpdatePasswordForm.ControlInput2">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your new email"
                {...register('email', { required: 'New Email is required' })}
                defaultValue={userData?.email}
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

export default UpdateEmail;
