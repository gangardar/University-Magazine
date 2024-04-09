import React, { useEffect, useState } from "react";
import './ArticleCard.css'
import ArticleImage from '../../../../assets/image.png'
import MessageSvg from '../../../../assets/message.svg'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Image, Container, Col, Row, ButtonGroup } from 'react-bootstrap';
import ThreeDotSvg from '../../../../assets/three_dots.svg';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {useDownload} from "../../../../services/Download/useDownload"
import JSZip from "jszip";
import FileSaver from "file-saver";


const ArticleCard = ({ data, onCardClick, status, onViewRefresh }) => {
    

    const {handleZip} = useDownload();

    const [articles, setArticles] = useState();
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (status === "Manager") {
            const approvedArticles = data.filter(article => article.approveStatus === "APPROVED");
            console.log(approvedArticles);
            setArticles(approvedArticles);
        } else {
            setArticles(data);
        }
    }, [data, status]);


    const handleRejectClick = (article_id) => {
        axios.post(`https://university-magazine-backend.onrender.com/api/v1/article/reject/${article_id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Response Reject:', response.data);
                onViewRefresh(true);
            })
            .catch(error => {
                setError(error);
                console.error('Error:', error);
            });
    };

    const handleAcceptClick = (article_id) => {
        axios.post(`https://university-magazine-backend.onrender.com/api/v1/article/approve/${article_id}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Response Approve:', response.data);
                onViewRefresh(true)
            })
            .catch(error => {
                setError(error)
                console.error('Error:', error);
            });
    };

    const handleDownloadClick = async (articleToDownload) => {
        const zip = new JSZip();
    
        const articleResponse = await fetch(articleToDownload.file);
        const articleBlob = await articleResponse.blob();
        zip.file('toDownloadArticle.docx', articleBlob);
    
        const coverPhotoResponse = await fetch(articleToDownload.coverPhoto);
        const coverPhotoBlob = await coverPhotoResponse.blob();
        zip.file('coverPhoto.jpg', coverPhotoBlob);
    
        zip.generateAsync({ type: 'blob' })
            .then(blob => {
                FileSaver.saveAs(blob, 'article.zip');
            })
            .catch(error => {
                console.error('Error generating zip:', error);
            });
    };
    

    

    if (!data || data.length === 0) {
        return <div>Loading...</div>;
    }

    if (status == null) {
        return (
            <div>
                {articles && (articles?.map((item, index) => (
                    <div className="card-container"
                        key={index}
                        onClick={() => onCardClick(item)}
                    >
                        <div className="profile">
                            <div style={{ display: "flex" }}>
                                <Image src={item.user.profilePhoto} roundedCircle />

                                <div style={{ display: "flex", width: "85%", flexDirection: 'column', marginTop: "8px" }}>
                                    <span style={{ fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 'bold' }} >{item.user && item.user.name ? item.user.name : ''}</span>
                                    <span style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 'normal', color: 'gray', marginTop: '0px' }}>{item.updatedDate ? formatDate(item.updatedDate) : ''} . {item.user ? item.user.faculty.name : 'Faculty Name'}</span>
                                </div>

                                <img src={ThreeDotSvg} alt='' className='' style={{ width: '18px', marginRight: '20px', cursor: 'pointer' }} />
                            </div>
                        </div>

                        <Card className="card">
                            <Card.Img variant="top" src={item.coverPhoto ? item.coverPhoto : ArticleImage} style={{ width: '100%', height: '280px', borderRadius: '0%' }} />
                            <Card.Body>
                                <Card.Title style={{ margin: '12px', fontFamily: 'sans-serif' }}>{item.title ? item.title : "Title"}</Card.Title>

                                {item.approveStatus == "APPROVED" ? (
                                    <label style={{ backgroundColor: '#55DF3E', padding: '2px 5px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }}>Approved</label>
                                ) : item.approveStatus == "REJECTED" ? (
                                    <label style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '4px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }} >Rejected</label>
                                ) : (
                                    <label style={{ backgroundColor: 'lightgray', color: 'black', padding: '5px 10px', borderRadius: '4px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }} >Pending</label>
                                )}

                            </Card.Body>
                        </Card>
                    </div>
                )))
                }
            </div >
        )
    } else {
        return (
            <div>
                {articles && (articles?.map((item, index) => (
                    <div className="card-container"
                        key={index}
                    >
                        <div className="profile" >
                            <div style={{ display: "flex" }} onClick={() => onCardClick(item)}>
                                <Image src={item.user.profilePhoto} roundedCircle />

                                <div style={{ display: "flex", width: "85%", flexDirection: 'column', marginTop: "8px" }}>
                                    <span style={{ fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 'bold' }} >{item.user.name}</span>
                                    <span style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 'normal', color: 'gray', marginTop: '0px' }}>{item.updatedDate ? formatDate(item.updatedDate) : ''} . {item.user ? item.user.faculty.name : 'Faculty Name'}</span>
                                </div>

                                <img src={ThreeDotSvg} alt='' className='' style={{ width: '18px', marginRight: '20px', cursor: 'pointer' }} />
                            </div>
                        </div>

                        <Card className="card">
                            <Card.Img onClick={() => onCardClick(item)} variant="top" src={item.coverPhoto ? item.coverPhoto : ArticleImage} style={{ width: '100%', height: '280px', borderRadius: '0%' }} />
                            <Card.Body>
                                <Card.Title style={{ margin: '12px', fontFamily: 'sans-serif' }}>{item.title ? item.title : "Title"}</Card.Title>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        {item.approveStatus === "APPROVED" ? (
                                            <label style={{ backgroundColor: '#55DF3E', padding: '2px 5px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }}>Approved</label>
                                        ) : item.approveStatus === "REJECTED" ? (
                                            <label style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '4px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }}>Rejected</label>
                                        ) : (
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <label style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }} onClick={() => handleRejectClick(item.id)}>Reject</label>
                                                <label style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', fontSize: '12px', fontFamily: 'sans-serif' }} onClick={() => handleAcceptClick(item.id)}>Approve</label>
                                            </div>
                                        )}
                                    </div>
                                    {status === "Manager" && (
                                        <Button variant="primary" size="sm" onClick={() => handleDownloadClick(item)}>Download</Button>
                                    )}
                                </div>
                            </Card.Body>

                        </Card>
                    </div>
                )))
                }
            </div >
        )
    }

}

function formatDate(inputDate) {
    const year = inputDate.substring(0, 4);
    const month = inputDate.substring(4, 6);
    const day = inputDate.substring(6, 8);

    const formattedDate = new Date(`${year}-${month}-${day}`);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return formattedDate.toLocaleDateString('en-US', options);
}

export default ArticleCard