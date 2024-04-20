import Navbar from "../../Student/Components/Navbar/Navbar";
import backIcon from "../../../assets/back_icon.svg"
import forwardIcon from "../../../assets/forward_icon.svg"
import React, { useState, useEffect } from "react";
import Dropdown from "../../Student/Components/Dropdown/Dropdown";
import axios from 'axios';
import ArticleCard from "../../Student/Components/Card/ArticleCard";
import { useNavigate } from 'react-router-dom';

const MarketingCoHome = () => {

    const [startIndex, setStartIndex] = useState(0);
    const [faculty, setFaculty] = useState([]);
    const [facultyId, setFacultyId] = useState(0);
    const [article, setArticle] = useState([]);
    const [error, setError] = useState(null);
    const [academicYear, setAcademicYear] = useState([]);

    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    const handleBackward = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const handleForward = () => {
        console.log("Click Forward ========> ")
        if (startIndex + 5 < faculty.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handleCardClick = (item) => {
        console.log("Clicked item data:", item);
        navigate('/marketingCoordinator/articleDetail', { state: { item: item } })
    };

    useEffect(() => {
        axios.get('https://university-magazine-backend.onrender.com/api/v1/academic-year', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
                console.log('Response academicYear ==========> ', response.data);
                setAcademicYear(response.data);
            })
            .catch(error => {
                setError(error)
                console.error('Error:', error);
            });
    }, []);

    const handleViewRefresh = (item) => {
        console.log("Clicked item data:", item);
        if (item) {
            axios.get('https://university-magazine-backend.onrender.com/api/v1/article', {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
                .then(response => {
                    console.log('Response Article ==========> ', response.data);
                    setArticle(response.data);
                })
                .catch(error => {
                    setError(error)
                    console.error('Error:', error);
                });
        }
    };

    const handleFacultyClick = (item) => {
        console.log("Clicked faculty:", item);
        axios.get(`https://university-magazine-backend.onrender.com/api/v1/article/byFaculty/${item.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
                console.log('Response Article By Faculty ==========> ', response.data);
                setArticle(response.data);
            })
            .catch(error => {
                setError(error)
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        axios.get('https://university-magazine-backend.onrender.com/api/v1/faculty', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
                console.log('Response Faculty:', response.data);
                setFaculty(response.data);
            })
            .catch(error => {
                setError(error)
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('https://university-magazine-backend.onrender.com/api/v1/article', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
                console.log('Response Article ==========> ', response.data);
                setArticle(response.data);
            })
            .catch(error => {
                setError(error)
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            <Navbar data={"marketingCoHome"} />

            <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                <Dropdown status={"marketingCoHome"} academicYearData={academicYear} />
            </div>

            <div style={{ width: "100%", height: '1px', backgroundColor: 'lightgrey', marginTop: "16px" }}></div>

            {/* <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '80%', justifyContent: 'flex-end', display: 'flex' }}>
                    <Dropdown status={"filter"} />
                </div>
            </div> */}

            <div style={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <div style={{ width: '450px' }}>
                    <ArticleCard data={article} status={"marketingCoHome"} onCardClick={handleCardClick} onViewRefresh={handleViewRefresh} />
                </div>
            </div>

        </div>
    )
}

export default MarketingCoHome;