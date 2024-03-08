import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "../component/Student/Components/Navbar/Navbar";
import Submit from "../component/Student/pages/Submit/Submit";
import Home from "../component/Student/pages/Home/Home";

const StudentPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/student/home" element={<Home />} />
        <Route path="/student/submit" element={<Submit />} />
      </Routes>
    </div>
  );
}

export default StudentPage;