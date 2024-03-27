import React, { useEffect, useState } from "react";
import '../Home/Home.css'
import Dropdown from "../../Components/Dropdown/Dropdown";
import ArticleCard from '../../Components/Card/ArticleCard';
import Navbar from "../../Components/Navbar/Navbar";
import AlertError from "../../../../assets/alert_error.svg"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [academicYear, setAcademicYear] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://university-magazine-backend.onrender.com/api/v1/article')
      .then(response => {
        console.log('Response:', response.data);
        setData(response.data);
      })
      .catch(error => {
        setError(error)
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://university-magazine-backend.onrender.com/api/v1/academic-year')
        .then(response => {
            console.log('Response academicYear ==========> ', response.data);
            setAcademicYear(response.data);
        })
        .catch(error => {
            setError(error)
            console.error('Error:', error);
        });
}, []);

  const handleCardClick = (item) => {
    console.log("Clicked item data:", item);
    navigate('/student/articleDetail', {state: {item: item}})
  };

  return (
    <div>
      <Navbar />
      {!error ? (
        <div className="home-container">
          <div className="home">
            <Dropdown academicYearData={academicYear}/>
            {data != null ? <ArticleCard data={data} onCardClick={handleCardClick} /> : null}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
           <img src={AlertError} alt='' style={{ width:'45px', height:'45px', marginBottom:'10px'}} />
          <h5>Something went wrong</h5>
          <label>There was a problem processing the request. Please reload the page.</label>
        </div>

      )}
    </div>
  )
}

export default Home