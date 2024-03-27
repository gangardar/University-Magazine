import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../../assets/logo.png';
import search_icon from '../../../../assets/search-icon-w.png';
import notification from '../../../../assets/notification.png';
import user from '../../../../assets/user.png';

const Navbar = ({ data, status }) => {
    const location = useLocation();

    return (

        <div style={{ width: '100%' }}>
            <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center', width: '100%', margin: '10px' }}>
                <img src={logo} alt="" className="logo" style={{ width: '10%', marginLeft: '16px' }} />

                {data == null ? (
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
                ) : data == "isArticleDetail" ? (
                    <div style={{ display: "flex", width: "50%", flexDirection: 'row', marginTop: "8px", alignItems: 'center', justifyContent: 'center' }}>

                        {status == null ? (
                            <>
                                <Link to="/student/home" style={{
                                    marginRight: '65px',
                                    textDecoration: 'none',
                                    borderBottom: `2px solid #17cf97`,
                                    color: "#17cf97",
                                }}>
                                    <h5 style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Home</h5>
                                </Link>
                                <Link to="/student/submit" style={{
                                    textDecoration: 'none',
                                    borderBottom: 'transparent',
                                    color: 'black',
                                }}>
                                    <h5 style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Submit</h5>
                                </Link>
                            </>

                        ) : (
                            <Link to="/marketingCoordinator/home" style={{
                                marginRight: '65px',
                                textDecoration: 'none',
                                borderBottom: `2px solid #17cf97`,
                                color: "#17cf97",
                            }}>
                                <h5 style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Home</h5>
                            </Link>
                        )}

                    </div>
                ) : (
                    <div style={{ display: "flex", width: "50%", flexDirection: 'row', marginTop: "8px", alignItems: 'center', justifyContent: 'center' }}>
                        <Link to="/student/home" style={{
                            marginRight: '65px',
                            textDecoration: 'none',
                            borderBottom: `2px solid #17cf97`,
                            color: "#17cf97",
                        }}>
                            <h5 style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Home</h5>
                        </Link>
                    </div>
                )
                }

                <div style={{ display: 'flex', flexDirection: 'row', width: '40%', alignItems: 'center', justifyContent: 'end' }}>
                    <div className="search-box">
                        <input type="text" placeholder="Search" />
                        <img src={search_icon} alt="" className="search-icon" />
                    </div>

                    <img src={notification} alt="" style={{ width: '20px', height: '20px', marginLeft: '20px', marginRight: '16px', cursor: 'pointer' }} />
                    <img src={user} alt="" style={{ width: '35px', height: '35px', marginLeft: '20px', cursor: 'pointer' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', marginLeft: '16px', marginRight: '25px' }}>
                        <label style={{ fontFamily: 'serif', fontSize: '14px' }}>John Doe</label>
                        <label style={{ fontFamily: 'serif', fontSize: '14px' }}>Student</label>
                    </div>
                </div>
            </div>

            <hr className='line' />

        </div>
    );
};

export default Navbar;