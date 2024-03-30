import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from "../component/Student/Components/Navbar/Navbar";
import Submit from "../component/Student/pages/Submit/Submit";
import Home from "../component/Student/pages/Home/Home";
import ArticleDetail from '../component/Student/pages/Detail/ArticleDetail';

const StudentPage = () => {
  return (
    <div>
      <Outlet />
      {/* <Routes>
        <Route path="/student/home" element={<Home />} />
        <Route path="/student/submit" element={<Submit />} />
        <Route path="/student/articleDetail" element={<ArticleDetail />} />
      </Routes> */}
    </div>
  );
}

export default StudentPage;