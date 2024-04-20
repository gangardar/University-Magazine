import { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import SuccessMessage from '../Feedback/SuccessMessage';
import ErrorMessage from '../Feedback/ErrorMessage';
import useReset from '../../services/Queries/Auth/useReset';

const PasswordReset = () => {
    const [modalStatus, setModalStatus]= useState(false);
    const {register, handleSubmit} = useForm();

    const {mutateAsync : resetPassword, isError : isResetError,
         isSuccess : isResetSuccess, error : resetError} = useReset();

    const toggleModal = () => {
        setModalStatus(!modalStatus);
    }

    const handleReset = (data) => {
        console.log(data);
        resetPassword(data).then(
            () => {
                // toggleModal();
            }
        )

    }

    return (
        <>

        <p className='text-danger text-decoration-underline' onClick={toggleModal}>
            Forgot credential? Reset now.
        </p>

        <Modal show={modalStatus} onHide={toggleModal}>
            {isResetError && <ErrorMessage message={resetError} />}
            {isResetSuccess && <SuccessMessage message={"Password has been reset. Check Mail!"} />}
            <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit(handleReset)}>
                <Form.Group className="mb-3" controlId="UpdatePasswordForm.ControlInput2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your new email"
                    {...register('email', { required: 'New Email is required' })}
                />
                </Form.Group>
                <Button variant="primary" type="submit">
                Reset
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
        </>
    );
}


  

export default PasswordReset;
