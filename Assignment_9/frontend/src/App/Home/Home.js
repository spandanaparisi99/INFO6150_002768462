import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import background from "../Img/bg.jpg";
const Home = () => {
  return (
    <div
      className="backgroundStyle"
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
      }}
    >
      <Navbar />
      <h3 className="text-center">
        Choose a job you love, and you will never have to work a day in your
        life
      </h3>
    </div>
  );
};
export default Home;
