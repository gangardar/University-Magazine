import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import backIcon from "../../assets/back_icon.svg"
import useUserById from '../../services/Queries/User/useUserById';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../Student/Components/Card/ArticleCard';
import useArticle from '../../services/Queries/Article/useArticle';

const MarketingManager = () => {
    const userId = localStorage.getItem("userId");
    const [userData, setUserData] = useState({});
    const [articleData, setArticleData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/');
        }
    }, [userId, navigate]);

    const { data: user, isLoading, isError } = useUserById(userId);
    const {data: article, isArticleLoading, isArticleError} = useArticle();

    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user]);

    useEffect(()=>{
        if(article) {
            setArticleData(article)
        }
    },[article])

    const handleCardClick = (item) => {
        console.log("Clicked item data:", item);
        navigate('/marketingCoordinator/articleDetail', { state: { item: item } })
    };

    const handleViewRefresh = () => {
        console.log("handle view Refresh");
    }

    return (
        <>
            <NavBar user={userData} />

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
