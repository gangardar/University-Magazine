import React from "react";
import '../Home/Home.css'
import Dropdown from "../../Components/Dropdown/Dropdown";
import ArticleCard from '../../Components/Card/ArticleCard';
import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  return (

    <div>

      <Navbar />
      <div className="home-container">

        <div className="home">
          <Dropdown />

          <ArticleCard data={items} />

        </div>


      </div>
    </div>

  )
}

export default Home