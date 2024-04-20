import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from "../component/Student/Components/Navbar/Navbar";
import MarketingCoHome from "../component/MarketingCoordinator/pages/MarketingCoHome";
import ArticleDetail from '../component/Student/pages/Detail/ArticleDetail';

const MarketingCoordinatorPage = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default MarketingCoordinatorPage;