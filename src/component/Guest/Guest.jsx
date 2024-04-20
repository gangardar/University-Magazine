import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../Student/Components/Card/ArticleCard';
import useArticleByFaculty from '../../services/Queries/Article/useArticleByFaculty';
import useUserById from '../../services/Queries/User/useUserById';
import DataNotFound from '../Feedback/DataNotFound';

const Guest = () => {
    const userId = localStorage.getItem("userId");
    const [articleData, setArticleData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/');
        }
    }, [userId, navigate]);

    const {data : userData} = useUserById(userId);
    const {data : article, isLoading : isArticleLoading, isError : isArticleError} = useArticleByFaculty(userData?.faculty?.id);
    

    useEffect(()=>{
        if(article) {
            setArticleData(article)
        }
    },[article])  


    

    const handleCardClick = (item) => {
        console.log("Clicked item data:", item);
    };
    
    const handleViewRefresh = () => {
        console.log("handle view Refresh");
    }
    

    return (
        <>

            {articleData !== undefined && articleData.length === 0 && (
                <div style={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    <div style={{ width: '450px' }}>
                        <DataNotFound />
                    </div>
                </div>
            )}

            {articleData && articleData.length > 0 && (
                <div style={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    <div style={{ width: '450px' }}>
                        <ArticleCard data={articleData} status={"Guest"} onCardClick={handleCardClick} onViewRefresh={handleViewRefresh} />
                    </div>
                </div>
            )}

        </>
    );
};

export default Guest;
