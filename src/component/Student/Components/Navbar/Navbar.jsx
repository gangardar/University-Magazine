// import React from "react";
// import { Link, useLocation } from 'react-router-dom';
// import './Navbar.css'
// import logo from '../../../../assets/logo.png'
// import search_icon from '../../../../assets/search-icon-w.png'
// import notification from '../../../../assets/notification.png'
// import user from '../../../../assets/user.png'


// const Navbar = () => {
//     return (
//         <div>
//             <div className="navbar">
//                 <img src={logo} alt="" className="logo" />

//                 <ul>
//                     <CustomLink href="/">Home</CustomLink>
//                     <CustomLink href="/submit">Submit</CustomLink>
//                 </ul>

//                 <div className="search-box">
//                     <input type="text" placeholder="Search" />
//                     <img src={search_icon} alt="" className="search-icon" />
//                 </div>

//                 <img src={notification} alt="" className="notification" />

//                 <img src={user} alt="" className="user-avatar" />

//                 <ul className="user-info">
//                     <li>John Doe</li>
//                     <li>Student</li>
//                 </ul>

//             </div>
//             <hr className="line" />
//         </div>
//     )
// }

// function CustomLink({ href, children, ...props }) {
//     const path = window.location.pathname
//     console.log("Current path Navbar:", window.location.pathname);
//     return (
//         <li>
//             <a className={path === href ? "active" : ""} href={href} {...props}>
//                 {children}
//             </a>
//         </li>
//     )
// }


// Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../../assets/logo.png';
import search_icon from '../../../../assets/search-icon-w.png';
import notification from '../../../../assets/notification.png';
import user from '../../../../assets/user.png';

const Navbar = () => {
    const location = useLocation();

    const linkStyle = {
        marginRight: '30px',
        textDecoration: 'none',
        borderBottom: `2px solid ${location.pathname === '/student/home' ? "#17cf97" : 'transparent'}`,
        color: location.pathname === '/student/home' ? "#17cf97" : 'black',
    };

    return (

        <div style={{ width: '100%' }}>
            <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', width: '100%', margin: '10px' }}>
                <img src={logo} alt="" className="logo" style={{ width: '10%', marginLeft: '16px' }} />

                <div style={{ display: "flex", width: "50%", flexDirection: 'row', marginTop: "8px", alignItems: 'center', justifyContent: 'center' }}>
                    <Link to="/student/home" style={{
                        marginRight: '65px',
                        textDecoration: 'none',
                        borderBottom: `2px solid ${location.pathname === '/student/home' ? "#17cf97" : 'transparent'}`,
                        color: location.pathname === '/student/home' ? "#17cf97" : 'black',
                    }}>
                        <h5 style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Home</h5>
                    </Link>
                    <Link to="/student/submit" style={{
                        textDecoration: 'none',
                        borderBottom: `2px solid ${location.pathname === '/student/submit' ? "#17cf97" : 'transparent'}`,
                        color: location.pathname === '/student/submit' ? "#17cf97" : 'black',
                    }}>
                        <h5 style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Submit</h5>
                    </Link>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', width: '40%', alignItems: 'center', justifyContent: 'end' }}>
                    <div className="search-box">
                        <input type="text" placeholder="Search" />
                        <img src={search_icon} alt="" className="search-icon" />
                    </div>

                    <img src={notification} alt="" style={{ width: '20px', height: '20px', marginLeft: '20px', marginRight: '16px' }} />
                    <img src={user} alt="" style={{ width: '35px', height: '35px', marginLeft: '20px' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', marginLeft: '16px', marginRight: '25px' }}>
                        <label style={{ fontFamily: 'serif', fontSize: '14px' }}>John Doe</label>
                        <label style={{ fontFamily: 'serif', fontSize: '14px' }}>Student</label>
                    </div>
                </div>


                {/* <img src={notification} alt="" className="notification" />

                <img src={user} alt="" className="user-avatar" />

                <ul className="user-info">
                    <li>John Doe</li>
                    <li>Student</li>
                </ul> */}
            </div>

            <hr className='line' />

        </div>
    );
};

function CustomLink({ to, children, ...props }) {
    const isActive = location.pathname === to;

    return (
        <li>
            <Link className={isActive ? "active" : ""} to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}

export default Navbar;