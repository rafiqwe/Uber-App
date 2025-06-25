import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center  bg-[url(/images/home.png)] h-screen pt-8 w-full flex justify-between flex-col bg-red-400">
        <div>
            <img className="w-14 ml-9 " src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
        </div>
        <div className="bg-white py-5 px-3 pb-7">
          <h1 className="text-2xl font-bold">Get Started with Uber</h1>
          <Link to={'/login'} className="flex relative items-center justify-center w-full py-3 text-white text-xl bg-black rounded-2xl mt-5">Continue <span className="absolute right-8" ><FaArrowRight /></span> </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
