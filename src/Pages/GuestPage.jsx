import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import GuestLayout from '../component/Guest/GuestLayout';

const GuestPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('userRole') !== 'GUEST'){
    const redirectPath = getRedirectPath();
    console.log("RedirectPath : " + redirectPath);
    navigate(redirectPath);
  }
  },[navigate])
    
      return (
        <>
            <GuestLayout/>
        </>
      );
}

export default GuestPage