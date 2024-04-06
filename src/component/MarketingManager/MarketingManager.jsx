import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import backIcon from "../../assets/back_icon.svg"
import useUser from '../../services/Queries/User/useUser';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../Student/Components/Card/ArticleCard';
import useArticle from '../../services/Queries/Article/useArticle';
import FilterComponent from './FilterComponent';
import useFaculty from '../../services/Queries/Faculty/useFaculty';
import useAcademic from '../../services/Queries/Academic/useAcademic';
import useArticleByFaculty from '../../services/Queries/Article/useArticleByFaculty';

const MarketingManager = () => {
    const userId = localStorage.getItem("userId");
    const [articleData, setArticleData] = useState([]);
    const [facultyData, setFacultyData] = useState([]);
    const [academicData, setAcademicData] = useState([]);
    const [filterData, setFilterData] = useState({});
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/');
        }
    }, [userId, navigate]);

    const {data: article, isArticleLoading, isArticleError} = useArticle();
    const {data: faculty, isFacultyLoading, isFacultyError} = useFaculty();
    const {data: academic, isAcademicLoading, isAcademicError} = useAcademic();
    const {data: user, isUserLoading, isUserError} = useUser();

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
        navigate('/marketingCoordinator/articleDetail', { state: { item: item } })
    };
    
    const handleViewRefresh = () => {
        console.log("handle view Refresh");
    }

    const handleFilterChange = (filter) => {
        setFilterData(filter);
        console.log(filterData);
        const facultyId = filterData.selectedFaculty;
        const userId = filterData.selectedUser;
        const academicId = filterData.selectedAcademicYear;

        if (facultyId) {
            const filteredArticle = articleData.filter((article) => {
                return article.user.faculty.id === facultyId; 
            });

            if (userId && academicId) {
                const filteredByUserAndAcademicYear = filteredArticle.filter((article) => {
                    return article.user.id === userId && article.academicYear.id === academicId;
                });
                setArticleData(filteredByUserAndAcademicYear);
            } else if (userId) {
                const filteredByUser = filteredArticle.filter((article) => {
                    return article.user.id === userId;
                });
                setArticleData(filteredByUser);
            } else if (academicId) {
                const filteredByAcademicYear = filteredArticle.filter((article) => {
                    return article.academicYear.id === academicId;
                });
                setArticleData(filteredByAcademicYear);
            } else {
                setArticleData(filteredArticle);
            }
        }

        if(userId && academicId){
            const filteredByUserAndAcademicYear = articleData.filter((article) => {
                return article.user.id === userId && article.academicYear.id === academicId;
            });
            setArticleData(filteredByUserAndAcademicYear);
        }

        if(userId || academicId){
            if (userId) {
                const filteredByUser = articleData.filter((article) => {
                    return article.user.id === userId;
                });
                setArticleData(filteredByUser);
            }

            if (academicId) {
                const filteredByAcademicYear = articleData.filter((article) => {
                    return article.academicYear.id === academicId;
                });
                setArticleData(filteredByAcademicYear);
            }
            
        }

        
        

    }

    return (
        <>
            <FilterComponent faculties={facultyData} academicYears={academicData} users={userData} filter={filterData} onFilterChange={handleFilterChange} />

            {articleData && (
                <div style={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    <div style={{ width: '450px' }}>
                        <ArticleCard data={articleData} status={"Manager"} onCardClick={handleCardClick} onViewRefresh={handleViewRefresh} />
                    </div>
                </div>
            )}
        </>
    );
};

export default MarketingManager;
