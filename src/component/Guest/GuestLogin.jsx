import React from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import backgroundImg from '../../UG.jpg'
import logo from '../../assets/greenwich_green_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import useFaculty from '../../services/Queries/Faculty/useFaculty';
import LoadingSpinner from '../Feedback/LoadingSpinner';
import ErrorMessage from '../Feedback/ErrorMessage';
import useRegGuest from '../../services/Queries/Guest/useRegGuest';
import SuccessMessage from '../Feedback/SuccessMessage';

const GuestLogin = () => {
    const {register, reset, handleSubmit, formState : {errors}} = useForm();
    const {data: facultyData, isLoading : isFetchingFaculty,
       isError : isFetchingFacultyError, error : fetchFacultyError} = useFaculty();

    const {mutateAsync : registerGuest, isError : isRegisterGuestError,
       isSuccess : isRegisterGuestSuccess, error : registerGuestError} = useRegGuest();

    const handleFormSubmit = (data) => {
      registerGuest(data). then(
        () => {
          reset();
        }
      )
      console.log(data)
    }


    const pageStyle = {
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };

      if(isFetchingFaculty){
        <LoadingSpinner message={"Please wait... Setting Up Form!"} />
      }

  return (
    <>
    <div style={pageStyle}>
    <Container style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', maxWidth: '650px', }}>
    {isFetchingFacultyError && <ErrorMessage message={fetchFacultyError} />}
    {isRegisterGuestError && <ErrorMessage message={registerGuestError} />}
    {isRegisterGuestSuccess && <SuccessMessage message={"Registered Successfully ! Please check your mail. This may take a day."} />}
        <Row className="mb-2 justify-content-center">
          <Col xs={12} md={10}>
            <div className="d-flex justify-content-start">
              <Image src={logo} fluid style={{width: '200px'}}/>
            </div>
          </Col>
        </Row>

        <Row className='justify-content-center'>
          <Col xs={12} md={10}>
            <Form onSubmit={handleSubmit(handleFormSubmit)} >
              <Col className="text-center">
                <h2>Sign Up</h2>
              </Col>


              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control {...register("email", {
                  required: "Email is required",
                })}
                  type="email" placeholder="Enter Email" />
                <Form.Text className="text-muted">
                  {errors.email ?
                    <span className='text-danger'>{errors.email.message}</span> :
                    <span>We'll never share your email with anyone else.</span>}
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="faculty">
                  <Form.Label className="font-weight-bold">Faculty</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Enter Faculty ID"
                    {...register("faculty", { required: "Faculty ID is required" })}
                  >
                    {facultyData?.length !== 0 &&
                      facultyData?.map((data) => (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                  </Form.Control>
                  <span className="text-danger">{errors.faculty?.message}</span>
                </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Link to={"/"}>I am Already Registered...</Link>
              </Form.Group>

              <Col className="text-center">
                <Button variant="primary" type="submit">
                  Proceed
                </Button>
                  
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  )
}

export default GuestLogin