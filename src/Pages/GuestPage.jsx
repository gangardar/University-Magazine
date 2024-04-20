import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

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
            <Outlet />
        </>
      );
}

export default GuestPage