import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserById from '../../services/Queries/User/useUserById'; 
import { Card, Button, Form, Image, Row, Col } from 'react-bootstrap';
import logo from '../../assets/greenwich_green_logo.png';
import UpdatePassword from './UpdatePassword';
import LoadingSpinner from '../Feedback/LoadingSpinner';
import UpdateEmail from './UpdateEmail';
import ErrorMessage from '../Feedback/ErrorMessage';
import useUpdateUser from '../../services/Queries/User/useUpdateUser';
import SuccessMessage from '../Feedback/SuccessMessage';

const Profile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const data = new FormData();
    const { data: user, isLoading : isUserFetchLoading, 
        isError : isUserFetchError, error : userFetchError, refetch : refetchUser } = useUserById(userId);

    const {mutateAsync: updateProfile, isError : isUpdatePhotoError, error : updatePhotoError,
         isSuccess : isUpdatePhotoSuccess} = useUpdateUser();

    useEffect(() => {
        if(!userId){
            navigate('/');
        }
    }, [userId, navigate]);

    const handleProfileImageChange = (event) => {
        console.log("started");
        const file = event.target.files[0];
        data.append('profilePhoto', file);
        data.append('name', user?.name);
        data.append('role', user?.role);
        data.append('email', user?.email);
        updateProfile({faculty: data, selectedFacultyId : userId}).then(
            () => refetchUser()
        )

    };

    const handleLogout = () => {
        navigate('/logout')
    }

    if (isUserFetchLoading) {
        return <LoadingSpinner message={"Loading your profile...."} />
    }

    return (
        
        <div className="container d-flex justify-content-center align-items-center flex-column mt-5">
            {isUserFetchError && <ErrorMessage message={userFetchError} />}
            {isUpdatePhotoError && <ErrorMessage message={updatePhotoError} />}
            {isUpdatePhotoSuccess && <SuccessMessage message={"Profile has been updated!"} />}
            <Card className="text-center p-4 shadow rounded" style={{ maxWidth: '600px', backgroundColor: '#eaf6ff' }}>
                <Card.Header style={{ backgroundColor: '#fff' }}>
                    
                        <div>
                            <Image src={logo} fluid style={{width: '200px'}}/>
                        </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title className="font-weight-bold mb-3">ID Card</Card.Title>
                    <hr />
                    <div className="text-muted mb-3">
                        <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center">
                            <div className="p-3">
                                <label htmlFor="profile-image-input" className="position-relative">
                                    <Image 
                                        src={user?.profilePhoto} 
                                        alt="Profile" 
                                        className="rounded" 
                                        style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }} 
                                    />
                                </label>
                                <Form.Control 
                                    id="profile-image-input"
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleProfileImageChange} 
                                    style={{ display: 'none' }} 
                                />
                            </div>
                            <div className="p-3 text-start">
                                <span className="font-weight-bold">Name:</span> {user?.name}<br />
                                <span className="font-weight-bold">Email:</span> {user?.email}<br/>
                                <span className="font-weight-bold">Role:</span> {user?.role}<br />
                                <span className="font-weight-bold">Faculty:</span> {user?.faculty?.name}<br/>

                            </div>
                        </div>
                    </div>
                    <Col>
                        <Row className='m-1'>
                            <UpdatePassword id={userId}/>
                        </Row>
                        <Row className='m-2'>
                            <UpdateEmail user={user} refetchUser={refetchUser} />
                        </Row>
                        <Row className='mx-3'>
                            <Button variant="danger" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Row>
                        
                    </Col>
                   
                </Card.Body>
            </Card>
        </div>
    );
};

export default Profile;
