import React from 'react'
import LoginForm from '../component/LoginForm';
import backgroundImg from '../UG.jpg';
import { Outlet } from 'react-router-dom';

const GuestPage = () => {
    
      return (
        <>
            <Outlet />
        </>
      );
}

export default GuestPage