import React from 'react'
import LoginForm from '../component/LoginForm';
import backgroundImg from '../UG.jpg';

const LoginPage = () => {
    const pageStyle = {
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
    
      return (
        <div style={pageStyle}>
          <LoginForm/>
        </div>
      );
}

export default LoginPage