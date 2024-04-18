import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const UpdateUser = ({ handleModalClose, modalState, handleModalSubmit, data, faculty, role }) => {
  const [userData , setUserData] = useState();

  useEffect(()=>{
    if(data & data?.length>0){
      setUserData(data[0]);
    }
  },[data]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     const userData = data[0];
  //     const { profilePhoto, ...userDataWithoutPhoto } = userData; // Destructure profilePhoto and userDataWithoutPhoto
  //     reset({
  //       ...userDataWithoutPhoto, // Spread the userDataWithoutPhoto object to set other fields
  //       profilePhoto: profilePhoto || '', // Set profilePhoto if it exists, otherwise set it to an empty string
  //     });
  //   }
  // }, [data, reset]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setValue('profilePhoto', file);
  //   }
  // };

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
                  // onChange={handleImageChange}
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
                  defaultValue={data[0]?.name}
                />
              </Form.Group>

              <Form.Group controlId="email">
              <Form.Label className="font-weight-bold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                {...register("email", { required: "Email is required",  pattern: /^\S+@\S+$/i })}
                defaultValue={data[0]?.email}
              />
              <span className="text-danger">{errors.email?.message}</span>
            </Form.Group>

              <Form.Group controlId="role" style={{ display: 'none'}}>
                <Form.Label className="font-weight-bold">Role</Form.Label>
                <Form.Control
                  as="select"
                  {...register("role", { required: "Role is required" })}
                  defaultValue={role || ""}
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="MANAGER">Marketing Manager</option>
                  <option value="COORDINATOR">Marketing Coordinator</option>
                  <option value="STUDENT">Student</option>
                </Form.Control>
                <span className="text-danger">{errors.role?.message}</span>
              </Form.Group>
              {role !== 'ADMIN' && role !== 'MANAGER' && (
                <Form.Group controlId="faculty">
                <Form.Label className="font-weight-bold">Faculty</Form.Label>
                <Form.Control
                  as="select"
                  {...register("faculty", { required: "Faculty ID is required" })}
                  defaultValue={data[0]?.faculty?.id || ""}
                >
                  {faculty.length !== 0 &&
                    faculty.map((facultyData) => (
                      <option key={facultyData.id} value={facultyData.id}>
                        {facultyData.name}
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
