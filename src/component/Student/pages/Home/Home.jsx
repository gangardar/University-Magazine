import React, { useEffect, useState } from "react";
import '../Home/Home.css'
import Dropdown from "../../Components/Dropdown/Dropdown";
import ArticleCard from '../../Components/Card/ArticleCard';
import Navbar from "../../Components/Navbar/Navbar";
import AlertError from "../../../../assets/alert_error.svg"
import FilterSvg from "../../../../assets/filter.svg"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const filterArticle = [
  {
    id: 1,
    title: "Article"
  },
  {
    id: 2,
    title: "My Article"
  }
]

const Home = () => {

  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [academicYear, setAcademicYear] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAcademicId, setSelectedAcademicId] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token")
  const user_id = localStorage.getItem("userId")
  const facultyId = localStorage.getItem("facultyId")

  const handleOptionSelect = (id) => {
    console.log("HandleOptionSelect => ", id)
    setSelectedAcademicId(id);
  };

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterSelect = (option) => {
    setSelectedOption(option.id);
    setIsOpen(false);
  };

  // useEffect(() => {
  //   if (selectedOption != null) {
  //     if (selectedOption === 1) {
  //       axios.get(`https://university-magazine-backend.onrender.com/api/v1/article/byFaculty/${facultyId}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })
  //         .then(response => {
  //           console.log('Response:', response.data);
  //           setData(response.data);
  //         })
  //         .catch(error => {
  //           setError(error)
  //           console.error('Error:', error);
  //         });
  //     } else {
  // axios.get(`https://university-magazine-backend.onrender.com/api/v1/article/byUser/${user_id}`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // })
  //   .then(response => {
  //     console.log('Response:', response.data);
  //     setData(response.data);
  //   })
  //   .catch(error => {
  //     setError(error)
  //     console.error('Error:', error);
  //   });
  //     }
  //   }

  // }, [selectedOption, token]);

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


  useEffect(() => {
    setStatus("")
    if (selectedAcademicId != null) {
      if (selectedOption == null || selectedOption == 1) {
        console.log("Selected Option is null or 1")
        axios.get(`https://university-magazine-backend.onrender.com/api/v1/article/ByAcademicYear?academicYear=${selectedAcademicId}&faculty=${facultyId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            console.log('Response by selectedAcademicId: ', response.data);
            if(response.data.length==0) {
              setStatus("empty")
            }
            setData(response.data);
          })
          .catch(error => {
            setError(error)
            console.error('Error:', error);
          });
      } else {

        console.log("Selected Option is 2")
        // axios.get(`https://university-magazine-backend.onrender.com/api/v1/article/byUser/${user_id}&academicYearId=${selectedAcademicId}`, {
        axios.get(` https://university-magazine-backend.onrender.com/api/v1/article/byUser?userId=${user_id}&academicYearId=${selectedAcademicId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            console.log('Response:', response.data);
            if(response.data.length==0) {
              setStatus("empty")
            }
            setData(response.data);
          })
          .catch(error => {
            setError(error)
            console.error('Error:', error);
          });
      }

    } else {
      if (academicYear.length > 0) {
        if (selectedOption == null || selectedOption == 1) {
          console.log("Selected Option is null or 1 [Level2]")
          axios.get(`https://university-magazine-backend.onrender.com/api/v1/article/ByAcademicYear?academicYear=${academicYear[0].id}&faculty=${facultyId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
              console.log("Response by selectedAcademicId is null ", response.data)
              if(response.data.length==0) {
                setStatus("empty")
              }
              setData(response.data);
            })
            .catch(error => {
              setError(error)
              console.error('Error:', error);
            });
        } else {
          console.log("Selected Option is 2 [Level2] ===> Academic Year Id ==> ", academicYear[0].id )
            axios.get(`https://university-magazine-backend.onrender.com/api/v1/article/byUser?userId=${user_id}&academicYearId=${academicYear[0].id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
              console.log('Response:', response.data);
              if(response.data.size==0) {
                setStatus("empty")
              }
              setData(response.data);
            })
            .catch(error => {
              setError(error)
              console.error('Error:', error);
            });
        }
      }
    }
  }, [selectedAcademicId, academicYear, token, facultyId, selectedOption]);

  const handleCardClick = (item) => {
    console.log("Clicked item data:", item);
    navigate('/student/articleDetail', { state: { item: { ...item, type: 'student' } } });
    // navigate('/student/articleDetail', { state: { item: item } })
  };

  return (
    <div>
      <Navbar />
      {!error ? (
        <div className="home-container">
          <div className="home">
            <div style={{ display: "flex", flexDirection: 'row', alignItems: "center" }}>
              <Dropdown academicYearData={academicYear} onOptionSelect={handleOptionSelect} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <img src={FilterSvg} onClick={toggleFilter} alt='' className='' style={{ marginLeft: '10px', width: '25px', height: '25px', cursor: 'pointer' }} />
                {isOpen && (
                  <div style={{
                    width: '100%',
                    position: 'absolute',
                    zIndex: '1',
                    marginTop: '30px',
                    background: 'white',
                    width: '110px',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    paddingLeft: '0px'
                  }}>
                    {
                      filterArticle.map((data) => (
                        <div
                          key={data.id}
                          onClick={() => handleFilterSelect(data)}
                          style={{ padding: '8px', cursor: 'pointer' }}
                        >
                          {data.title}
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
            </div>

            {data != null ? <ArticleCard data={data} onCardClick={handleCardClick} loadingStatus={status} /> : null}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
          <img src={AlertError} alt='' style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
          <h5>Something went wrong</h5>
          <label>There was a problem processing the request. Please reload the page.</label>
        </div>

      )}
    </div>
  )
}

export default Home