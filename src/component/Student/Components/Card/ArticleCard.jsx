import React from "react";
import './ArticleCard.css'
import ArticleImage from '../../../../assets/image.png'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Image, Container, Col, Row } from 'react-bootstrap';
import ThreeDotSvg from '../../../../assets/three_dots.svg';

const ArticleCard = ({ data }) => {
    return (
        <div>
            {data.map((item, index) => (
                <div className="card-container">
                    <div className="profile">
                        <div style={{ display: "flex" }}>
                            <Image src={ArticleImage} roundedCircle />

                            <div style={{ display: "flex", width: "85%", flexDirection: 'column', marginTop: "8px" }}>
                                <span style={{ fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 'bold' }} >John Doe</span>
                                <span style={{ fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 'normal', color: 'gray', marginTop: '0px' }}>2 hours ago . Faculty Name</span>
                            </div>

                            <img src={ThreeDotSvg} alt='' className='' style={{ width: '18px', marginRight: '20px', cursor: 'pointer' }} />
                        </div>
                    </div>

                    <Card className="card">
                        <Card.Img variant="top" src={ArticleImage} style={{ width: '100%', borderRadius: '0%' }} />
                        <Card.Body>
                            <Card.Title style={{ margin: '12px', fontFamily: 'sans-serif' }}>Card Title</Card.Title>

                            <label style={{ backgroundColor: '#55DF3E', padding: '2px 5px', margin: '0px 11px', fontSize: '12px', fontFamily: 'sans-serif' }}>Selected</label>

                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default ArticleCard