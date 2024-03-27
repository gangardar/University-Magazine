import React, { useEffect } from 'react';
import { Button, Form, Image, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const UpdateUser = ({ handleModalClose, modalState, handleModalSubmit, data, faculty, role }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (data && data.length > 0) {
      const userData = data[0];
      const { profilePhoto, ...userDataWithoutPhoto } = userData; // Destructure profilePhoto and userDataWithoutPhoto
      reset({
        ...userDataWithoutPhoto, // Spread the userDataWithoutPhoto object to set other fields
        profilePhoto: profilePhoto || '', // Set profilePhoto if it exists, otherwise set it to an empty string
      });
    }
  }, [data, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('profilePhoto', file);
    }
  };

  return (
    <Modal show={modalState} onHide={handleModalClose} centered>
      <ModalHeader closeButton>
        <Modal.Title className="text-primary">Update Faculty</Modal.Title>
      </ModalHeader>
      <ModalBody>
        {data && data.length > 0 && (
          <> 
            <Image src={data[0]?.profilePhoto} alt="Profile" roundedCircle style={{ width: '20%', marginBottom: '10px' }}  />
            <Form onSubmit={handleSubmit(handleModalSubmit)}>
              <Form.Group controlId="profile" className='my-2'>
                <Form.Label className="font-weight-bold">Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  {...register("profilePhoto")}
                />
                <span className="text-danger">{errors.profilePhoto?.message}</span>
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label className="font-weight-bold">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Updated Name"
                  {...register('name', { required: "Faculty's name is required!" })}
                />
              </Form.Group>
              <Form.Group controlId="role" style={{ display: data[0]?.role ? 'block' : 'none' }}>
                <Form.Label className="font-weight-bold">Role</Form.Label>
                <Form.Control
                  as="select"
                  {...register("role", { required: "Role is required" })}
                  defaultValue={role || ""}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Marketing Manager">Marketing Manager</option>
                  <option value="Marketing Coordinator">Marketing Coordinator</option>
                  <option value="Student">Student</option>
                </Form.Control>
                <span className="text-danger">{errors.role?.message}</span>
              </Form.Group>
              {role !== 'Admin' && role !== 'Marketing Manager' && (
                <Form.Group controlId="faculty">
                  <Form.Label className="font-weight-bold">Faculty</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Enter Faculty ID"
                    {...register("faculty", { required: "Faculty ID is required" })}
                  >
                    {faculty.length !== 0 &&
                      faculty.map((data) => (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                  </Form.Control>
                  <span className="text-danger">{errors.faculty?.message}</span>
                </Form.Group>
              )}
              <ModalFooter>
                <Button type='submit' variant='success'>
                  Submit
                </Button>
                <Button onClick={handleModalClose} variant='danger'>
                  Close
                </Button>
              </ModalFooter>
            </Form>
          </>
        )}
      </ModalBody>
    </Modal>
  );
};

export default UpdateUser;
