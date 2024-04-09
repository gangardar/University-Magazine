import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserById from '../../services/Queries/User/useUserById'; 
import { Card, Button, Form, Image } from 'react-bootstrap';
import logo from '../../assets/greenwich_green_logo.png';
import { useForm } from 'react-hook-form';
import UpdatePassword from './UpdatePassword';

const Profile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const { data: user, isLoading, isError } = useUserById(userId);
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        if(!userId){
            navigate('/');
        }
    }, [userId, navigate]);

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        const data = new useForm();
    };

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="container mt-5">
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
                                    <img 
                                        src={user.profilePhoto} 
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
                            <div className="p-3">
                                <span className="font-weight-bold">Name:</span> {user.name}<br />
                                <span className="font-weight-bold">Role:</span> {user.role}<br />
                                <span className="font-weight-bold">Faculty:</span> {user.faculty.name}
                            </div>
                        </div>
                    </div>

                    <UpdatePassword id={userId}/>
                </Card.Body>
            </Card>

            {/* Password Change Modal */}
            {/* Implement your password change modal here */}
        </div>
    );
};

export default Profile;
