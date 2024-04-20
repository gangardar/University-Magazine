import React, { useEffect, useState } from 'react';
import useUser from '../../services/Queries/User/useUser';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../Student/Components/Card/ArticleCard';
import useArticle from '../../services/Queries/Article/useArticle';
import FilterComponent from './FilterComponent';
import useFaculty from '../../services/Queries/Faculty/useFaculty';
import useAcademic from '../../services/Queries/Academic/useAcademic';
import DataNotFound from '../Feedback/DataNotFound';

const MarketingManager = () => {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    const [articleData, setArticleData] = useState([]);
    const [facultyData, setFacultyData] = useState([]);
    const [academicData, setAcademicData] = useState([]);
    const [filterData, setFilterData] = useState({});
    const [filterStatus, setFilterStatus] = useState(false);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/');
        }
    }, [userId, navigate]);

    const {data: article, isLoading : isArticleLoading, isError : isArticleError} = useArticle();
    const {data: faculty, isLoading : isFacultyLoading, isError : isFacultyError} = useFaculty();
    const {data: academic, isLoading : isAcademicLoading, isError : isAcademicError} = useAcademic();
    const {data: user, isLoading : isUserLoading, isError : isUserError, refetch} = useUser();

    useEffect(()=>{
        if(article) {
            setArticleData(article)
        }
    },[article])

    useEffect(() => {
        if(faculty){
            setFacultyData(faculty);
        }
    },[faculty]);

    useEffect(() =>{
        if(academic){
            setAcademicData(academic);
        }
    },[academic])

    useEffect(() => {
        if(user){
            const manager = user.filter(u => u.role === "COORDINATOR");
            setUserData(manager);
        }
    },[user])

    const handleCardClick = (item) => {
        console.log("Clicked item data:", item);
    };
    
    const handleViewRefresh = () => {
        console.log("handle view Refresh");
    }

    const handleFilterChange = (filter) => {
        const selectedFaculty = filter?.selectedFaculty;
        const selectedAcademicYear = filter?.selectedAcademicYear;
        // Initialize filter status
        let filterStatus = false;
    
        if ((!selectedFaculty  && !selectedUser && !selectedAcademicYear)) {
            console.log('reset');
            setFilterData({}); // Reset filter data
            refetch();
        } else {
            let filteredArticles = articleData;
    
            if (selectedFaculty) {
                console.log("faculty");
                filteredArticles = filteredArticles.filter((article) => {
                    filterStatus = true; // Set filter status to true if filter is applied
                    return article.user.faculty.id == selectedFaculty;
                });
            }
    
            console.log("after first filter");
            console.log(filteredArticles);
    
            if (selectedAcademicYear) {
                console.log("Academic")
                filteredArticles = filteredArticles.filter((article) => {
                    filterStatus = true; // Set filter status to true if filter is applied
                    return article.academicYear.id == selectedAcademicYear;
                });
            }
    
            console.log("Filtered Articles");
            console.log(filteredArticles);
    
            setFilterData(filteredArticles); // Set filtered data
        }
    
        // Update filter status
        setFilterStatus(filterStatus);
        console.log(filterStatus)
    };   
    

    return (
        <>
            <FilterComponent faculties={facultyData} academicYears={academicData} users={userData} onFilterChange={handleFilterChange} />

            {(articleData || filterData) && (
                <div style={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    <div style={{ width: '450px' }}>
                        {(filterStatus && !filterData.length > 0) ? 
                        <DataNotFound /> : 
                        (<ArticleCard data={filterStatus ? filterData : articleData} status={"Manager"} onCardClick={handleCardClick} onViewRefresh={handleViewRefresh} />)}
                    
                    </div>
                </div>
            )}
        </>
    );
};

export default MarketingManager;
