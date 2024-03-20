import React, { useState, useRef } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useLocation } from 'react-router-dom';
import { Image, Container, Col, Row } from 'react-bootstrap';
import ArticleImage from '../../../../assets/image.png'
import ThreeDotSvg from '../../../../assets/three_dots.svg';


const ArticleDetail = () => {
    const location = useLocation();
    const item = location.state ? location.state.item : null;
    const [articleTitle, setArticleTitle] = useState('');

    const handleChange = (e) => {
        setArticleTitle(e.target.value);
    };

    return (
        <div>
            <Navbar data={"isArticleDetail"} />

            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '16px' }}>


                <div style={{ display: 'flex', width: '49%', paddingRight: '2%', }}>
                    <div style={{ width: '100%', marginTop: '0px', justifyContent: "center", alignItems: 'center' }}>
                        <img src={item.coverPhoto} alt="" style={{ width: '70%', marginLeft: '30%', height: '320px' }} />
                    </div>
                </div>

                <div style={{ width: '2px', backgroundColor: 'gray' }}></div>

                <div style={{ display: 'flex', width: '45%', flexDirection: 'column', paddingLeft: '2%' }}>
                    <div className="profile">
                        <div style={{ display: "flex" }}>
                            <Image src={item.user.profilePhoto} roundedCircle />

                            <div style={{ display: "flex", width: "85%", flexDirection: 'column', marginTop: "8px" }}>
                                <span style={{ fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 'bold' }} >{item.user && item.user.name ? item.user.name : ''}</span>
                                <span style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 'normal', color: 'gray', marginTop: '0px' }}>{item.updatedDate ? formatDate(item.updatedDate) : ''} . {item.user ? item.user.faculty : 'Faculty Name'}</span>
                            </div>

                            <img src={ThreeDotSvg} alt='' className='' style={{ width: '18px', marginRight: '20px', cursor: 'pointer' }} />

                        </div>
                        {/* <div style={{ width: '100%', height: '1px', backgroundColor: 'lightgray' }}></div> */}
                    </div>

                    <div style={{ marginTop: '10px', marginBottom: '16px' }}>
                        <h6 style={{ marginLeft: '10px' }}>{item.title}</h6>
                        <label style={{ backgroundColor: item.approveStatus ? '#55DF3E' : 'lightgrey', padding: '2px 5px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif', marginTop: '5px' }}>{item.approveStatus ? "Selected" : "Pending"}</label>
                    </div>

                    <div style={{ width: '100%', height: '1px', backgroundColor: 'lightgray' }}></div>

                    <div style={{ marginTop: '12px' }}>
                        <div>
                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <Image src={item.user.profilePhoto} roundedCircle style={{ width: '28px', height: '28px', marginRight: '5px' }} />

                                <div style={{ display: "flex", width: "80%", flexDirection: 'column', marginTop: "8px" }}>
                                    <span style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 'normal' }} >{item.user && item.user.name ? item.user.name : ''}</span>
                                    <span style={{ fontFamily: 'sans-serif', fontSize: '10px', fontWeight: 'normal', color: 'gray', marginTop: '0px' }}>{item.updatedDate ? formatDate(item.updatedDate) : ''} . {item.user ? item.user.faculty : 'Faculty Name'}</span>
                                </div>
                            </div>
                        </div>
                        <label style={{ fontFamily: 'sans-serif', fontSize: '11px', fontWeight: 'normal', color: 'black', marginLeft: '5px' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make</label>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                        <div>
                            <div style={{ display: "flex", }}>
                                <Image src={item.user.profilePhoto} roundedCircle style={{ width: '28px', height: '28px', marginRight: '5px', marginTop: '5px' }} />

                                <div style={{ display: "flex", width: "80%", flexDirection: 'column', marginTop: "8px" }}>
                                    <span style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 'normal' }} >{item.user && item.user.name ? item.user.name : ''}</span>
                                    <input
                                        type="text"
                                        id="textInput"
                                        value={articleTitle}
                                        onChange={handleChange}
                                        style={{
                                            height: '35px',
                                            width: '95%',
                                            padding: "0px 5px",
                                            border: '1px solid lightgray',
                                            borderRadius: '5px',
                                            fontSize: '12px',
                                        }}
                                        placeholder="Comment"
                                    />
                                    <div style={{ display: 'flex', width: '95%', justifyContent: 'flex-end' }}>
                                        <label
                                            style={{ backgroundColor: 'green', padding: '3px 13px', margin: '5px 0px', fontSize: '12px', fontFamily: 'sans-serif', marginTop: '5px', color: 'white', borderRadius: '10px', cursor: 'pointer', }}
                                            // onClick={ }
                                        >Post</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>

        </div>
    )
}

function formatDate(inputDate) {
    const year = inputDate.substring(0, 4);
    const month = inputDate.substring(4, 6);
    const day = inputDate.substring(6, 8);

    const formattedDate = new Date(`${year}-${month}-${day}`);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return formattedDate.toLocaleDateString('en-US', options);
}

export default ArticleDetail