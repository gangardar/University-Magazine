import React, { useEffect, useState } from 'react'
import useUserById from '../../services/Queries/User/useUserById';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../MarketingManager/NavBar';

const GuestLayout = () => {
    const userId = localStorage.getItem("userId");
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/');
        }
    }, [userId, navigate]);

    const { data: user, isLoading, isError } = useUserById(userId);
    console.log(userData);

    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user]);

  return (
    <>
    <NavBar user={userData} />

    <Outlet userData={userData} />
    </>
    
  )
}

export default GuestLayout