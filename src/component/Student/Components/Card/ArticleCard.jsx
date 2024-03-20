import React from "react";
import './ArticleCard.css'
import ArticleImage from '../../../../assets/image.png'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Image, Container, Col, Row } from 'react-bootstrap';
import ThreeDotSvg from '../../../../assets/three_dots.svg';
import { Link, useLocation } from 'react-router-dom';

const ArticleCard = ({ data, onCardClick }) => {

    return (
        <div>
            {data.map((item, index) => (
                <div className="card-container"
                    key={index}
                    onClick={() => onCardClick(item)}
                >
                    <div className="profile">
                        <div style={{ display: "flex" }}>
                            <Image src= {item.user.profilePhoto} roundedCircle />

                            <div style={{ display: "flex", width: "85%", flexDirection: 'column', marginTop: "8px" }}>
                                <span style={{ fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 'bold' }} >{item.user && item.user.name ? item.user.name : ''}</span>
                                <span style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 'normal', color: 'gray', marginTop: '0px' }}>{item.updatedDate ? formatDate(item.updatedDate) : ''} . {item.user ? item.user.faculty : 'Faculty Name'}</span>
                            </div>

                            <img src={ThreeDotSvg} alt='' className='' style={{ width: '18px', marginRight: '20px', cursor: 'pointer' }} />
                        </div>
                    </div>

                    <Card className="card">
                        <Card.Img variant="top" src={item.coverPhoto ? item.coverPhoto : ArticleImage} style={{ width: '100%', height: '280px', borderRadius: '0%' }} />
                        <Card.Body>
                            <Card.Title style={{ margin: '12px', fontFamily: 'sans-serif' }}>{item.title ? item.title : "Title"}</Card.Title>

                            <label style={{ backgroundColor: item.approveStatus ? '#55DF3E' : 'lightgrey', padding: '2px 5px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }}>{item.approveStatus ? "Selected" : "Pending"}</label>

                        </Card.Body>
                    </Card>
                </div>
    ))
}
        </div >
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

export default ArticleCard