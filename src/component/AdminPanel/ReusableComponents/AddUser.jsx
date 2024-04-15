import React, { useState } from 'react';
import { Button, Form, Image, Modal} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function AddUser({handleModalSubmit, Role, faculty}) {

   const[modalState, setModalState]=useState(false);
  const [imagePreview, setImagePreview] = useState(null);

   const handleModalClose= () => {
    setModalState(!modalState);
   }

   const handleImageChange = (e) => {
    console.log(e);
  
    // Rest of your logic to handle the file selection
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm();  
  return (
    <>
    <Button onClick={handleModalClose} variant='success'>Add New</Button>     
    <Modal show={modalState} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {imagePreview && 
          <Image src={imagePreview} roundedCircle style={{ width: '20%', marginBottom: '10px' }} />}

          <Form onSubmit={handleSubmit(handleModalSubmit)}>
          <Form.Group controlId="profile" className='my-2'>
            <Form.Label className="font-weight-bold">Profile Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              {...register("profilePhoto", { required: "Profile image is required" })}
            />
            <span className="text-danger">{errors.profilePhoto?.message}</span>
          </Form.Group>

            <Form.Group controlId="name">
              <Form.Label className="font-weight-bold">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                {...register("name", { required: "Name is required" })}
              />
              <span className="text-danger">{errors.name?.message}</span>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label className="font-weight-bold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                {...register("email", { required: "Email is required",  pattern: /^\S+@\S+$/i })}
              />
              <span className="text-danger">{errors.email?.message}</span>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="font-weight-bold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: "Password is required" })}
              />
              <span className="text-danger">{errors.password?.message}</span>
            </Form.Group>

            <Form.Group controlId="role" style={{ display : 'none' }}>
              <Form.Label className="font-weight-bold">Role</Form.Label>
              <Form.Control
                as="select"
                {...register("role", { required: "Role is required" })}
                defaultValue={Role || ""}
              >
                <option value="">Select Role</option>
                <option value="ADMIN">Admin</option>
                <option value="MANAGER">Marketing Manager</option>
                <option value="COORDINATOR">Marketing Coordinator</option>
                <option value="STUDENT">Student</option>
                {/* Add other roles as needed */}
              </Form.Control>
              <span className="text-danger">{errors.role?.message}</span>
            </Form.Group>

            {/* <Form.Group controlId="faculty">
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
            </Form.Group> */}
            {Role !== 'ADMIN' && Role !== 'MANAGER' && (
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


            <Modal.Footer>
              <Button type="submit" variant="success">
                Submit
              </Button>
              <Button onClick={handleModalClose} variant="danger">
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
    
  );
}