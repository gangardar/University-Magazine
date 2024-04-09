import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useLocation } from 'react-router-dom';
import { Image, Container, Col, Row } from 'react-bootstrap';
import ArticleImage from '../../../../assets/image.png'
import ThreeDotSvg from '../../../../assets/three_dots.svg';
import ThreeDotVerticalSvg from '../../../../assets/three_dot_vertical.svg';
import axios from 'axios';

const ArticleDetail = () => {

    // const [item, setItem] = useState([]);
    const location = useLocation();
    // const item = location.state ? location.state.item : null;
    const [item, setItem] = useState(location.state ? location.state.item : null);
    const [inputComment, setInputComment] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [commentIndex, setCommentIndex] = useState(-1);
    const token = localStorage.getItem("token")
    const [comment, setComment] = useState([]);
    const [error, setError] = useState(null);
    const userName = localStorage.getItem("userName")
    const userId = localStorage.getItem("userId")

    const handleThreeDotClick = (showDelete, index) => {
        setCommentIndex(index)
        setShowDelete(showDelete)

    };

    console.log("Token : ", token)
    console.log("item ============= ", item)

    // useEffect(() => {
    //     console.log("Refresh Test ", argsData.id)
    //     axios.get(`https://university-magazine-backend.onrender.com/api/v1/article/${argsData.id}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(response => {
    //             console.log('Response Article:', response.data);
    //             setItem(response.data);
    //         })
    //         .catch(error => {
    //             setError(error)
    //         });
    // }, []);

    const handleDeleteClick = () => {
        axios.delete(`https://university-magazine-backend.onrender.com/api/v1/comment/${commentIndex}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setShowDelete(!showDelete)
                console.log('Response Comment delete :', response.data);
                axios.get(`https://university-magazine-backend.onrender.com/api/v1/comment/${item.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        setComment(response.data);
                    })
                    .catch(error => {
                        setError(error)
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                setShowDelete(!showDelete)
                setError(error)
                console.error('Error:', error);
            });

    }

    const handleRejectClick = (article_id) => {
        axios.post(
            `https://university-magazine-backend.onrender.com/api/v1/article/reject/${article_id}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(response => {
                console.log('Response Reject:', response.data);
                axios.get(`https://university-magazine-backend.onrender.com/api/v1/article/${article_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        console.log('Response Article:', response.data);
                        setItem(prevItem => ({
                            ...prevItem,
                            approveStatus: "REJECTED"
                        }));
                    })
                    .catch(error => {
                        setError(error)
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                setError(error);
                console.error('Error:', error);
            });
    };

    const handleAcceptClick = (article_id) => {
        console.log("ArticleId : ", article_id)
        axios.post(`https://university-magazine-backend.onrender.com/api/v1/article/approve/${article_id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Response Approve:', response.data);
                setItem(prevItem => ({
                    ...prevItem,
                    approveStatus: "APPROVED"
                }));
            })
            .catch(error => {
                setError(error)
                console.error('Error:', error);
            });
    };

    const handleChange = (e) => {
        setInputComment(e.target.value);
    };

    useEffect(() => {
        axios.get(`https://university-magazine-backend.onrender.com/api/v1/comment/${item.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("Response Comments : ", response.data)
                setComment(response.data);
            })
            .catch(error => {
                setError(error)
            });
    }, []);

    const handlePostClick = async (data) => {

        if (inputComment != "") {
            console.log("handlePostClick Data =====> ", data.id + " =========== " + data.user.id);
            try {
                const formData = new FormData();
                formData.append('articleId', data.id);
                formData.append('userId', userId);
                formData.append('comment', inputComment);

                console.log("formData =====> ", formData);

                const response = await axios.post(
                    'https://university-magazine-backend.onrender.com/api/v1/comment/add',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        },
                    }
                );
                setInputComment('')
                axios.get(`https://university-magazine-backend.onrender.com/api/v1/comment/${item.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        setComment(response.data);
                    })
                    .catch(error => {
                        setError(error)
                        console.error('Error:', error);
                    });
                console.log("Response Comment Add ==> ", response.data);
            } catch (error) {
                console.error('Error uploading files:', error);
            }
        }

    };


    return (
        <div>
            {
                location.pathname === "/student/articleDetail" ? (
                    <Navbar data={"isArticleDetail"} />
                ) : (
                    <Navbar data={"isArticleDetail"} status={"isMarketingCoordinator"} />
                )
            }

            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '16px' }}>


                <div style={{ display: 'flex', width: '49%', paddingRight: '2%', }}>
                    <div style={{ width: '100%', marginTop: '0px', justifyContent: "center", alignItems: 'center' }}>
                        <img src={item.coverPhoto} alt="" style={{ width: '70%', marginLeft: '30%', height: '320px' }} onClick={() => {
                            window.open('https://university-magazine-backend.onrender.com/api/v1/article/file/download/2');
                        }} />
                    </div>
                </div>

                <div style={{ width: '2px', backgroundColor: 'gray' }}></div>

                <div style={{ display: 'flex', width: '45%', flexDirection: 'column', paddingLeft: '2%' }}>
                    <div className="profile">
                        <div style={{ display: "flex" }}>
                            <Image src={item.user.profilePhoto} roundedCircle />

                            <div style={{ display: "flex", width: "85%", flexDirection: 'column', marginTop: "8px" }}>
                                <span style={{ fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 'bold' }} >{item.user.name}</span>
                                <span style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 'normal', color: 'gray', marginTop: '0px' }}>{item.updatedDate ? formatDate(item.updatedDate) : ''} . {item.user ? item.user.faculty.name : 'Faculty Name'}</span>
                            </div>

                            <img src={ThreeDotSvg} alt='' className='' style={{ width: '18px', marginRight: '20px', cursor: 'pointer' }} />

                        </div>
                        {/* <div style={{ width: '100%', height: '1px', backgroundColor: 'lightgray' }}></div> */}
                    </div>


                    {
                        item.type != "student" ? (
                            <div style={{ marginTop: '12px', marginBottom: '16px' }}>
                                <h6 style={{ marginLeft: '10px' }}>{item.title}</h6>
                                {item.approveStatus == "APPROVED" ? (
                                    <label style={{ backgroundColor: '#55DF3E', padding: '2px 5px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }}>Approved</label>
                                ) : item.approveStatus == "REJECTED" ? (
                                    <label style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '4px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }} >Rejected</label>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <label style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }} onClick={() => handleRejectClick(item.id)}>Reject</label>
                                        <label style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', fontSize: '12px', fontFamily: 'sans-serif' }} onClick={() => handleAcceptClick(item.id)} >Approve</label>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ marginTop: '12px', marginBottom: '16px' }}>
                                <h6 style={{ marginLeft: '10px' }}>{item.title}</h6>
                                {item.approveStatus == "APPROVED" ? (
                                    <label style={{ backgroundColor: '#55DF3E', padding: '2px 5px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }}>Approved</label>
                                ) : item.approveStatus == "REJECTED" ? (
                                    <label style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '4px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }} >Rejected</label>
                                ) : (
                                    <label style={{ backgroundColor: 'lightgray', color: 'black', padding: '5px 10px', borderRadius: '4px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }} >Pending</label>
                                )}
                            </div>
                        )
                    }


                    <div style={{ width: '100%', height: '1px', backgroundColor: 'lightgray' }}></div>

                    <div style={{ marginTop: '12px' }}>
                        {
                            comment.map((commentItem, index) => (
                                <div style={{ marginTop: '10px' }}>
                                    <div style={{ display: "flex", alignItems: 'center', backgroundColor: 'white' }}>
                                        <Image src={commentItem.user.profilePhoto} roundedCircle style={{ width: '28px', height: '28px', marginRight: '5px' }} />
                                        <div style={{ display: "flex", flexDirection: 'column', marginTop: "8px", }}>
                                            <span style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 'normal' }} >{commentItem.user && commentItem.user.name ? commentItem.user.name : ''}</span>
                                            <span style={{ fontFamily: 'sans-serif', fontSize: '10px', fontWeight: 'normal', color: 'gray', marginTop: '0px' }}>{commentItem.createdAt ? formatDate(commentItem.createdAt) : ''}</span>
                                        </div>
                                        {
                                            showDelete && commentIndex == commentItem.id ? (
                                                <div style={{ marginLeft: '0px' }}>
                                                    <div style={{ backgroundColor: "#f5f5f5", padding: '4px 8px', fontSize: '11px', zIndex: '1', cursor: 'pointer', position: 'absolute', marginLeft: '30px', marginTop: '12px' }} onClick={() => handleDeleteClick()}>delete</div>
                                                </div>
                                            ) : null
                                        }

                                        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '32px', flexDirection: 'column' }}>
                                            {/* <img src={ThreeDotVerticalSvg} alt='' className='arrow-down' style={{ marginLeft: '10px', width: '14px' }} onClick={() => { setCommentIndex(index); setShowDelete(!showDelete); }} /> */}
                                            <img src={ThreeDotVerticalSvg} alt='' className='arrow-down' style={{ marginLeft: '10px', width: '14px' }} onClick={() => { handleThreeDotClick(!showDelete, commentItem.id) }} />
                                        </div>


                                    </div>
                                    <label style={{ fontFamily: 'sans-serif', fontSize: '11px', fontWeight: 'normal', color: 'black', marginLeft: '5px' }}>{commentItem.comment}</label>
                                </div>
                            ))
                        }

                    </div>

                    <div style={{ marginTop: '16px' }}>
                        <div>
                            <div style={{ display: "flex", }}>
                                <Image src={item.user.profilePhoto} roundedCircle style={{ width: '28px', height: '28px', marginRight: '5px', marginTop: '5px' }} />

                                <div style={{ display: "flex", width: "80%", flexDirection: 'column', marginTop: "8px" }}>
                                    <span style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 'normal' }} >{userName}</span>
                                    <input
                                        type="text"
                                        id="textInput"
                                        value={inputComment}
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
                                            onClick={() => { handlePostClick(item) }}
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