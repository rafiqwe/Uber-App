import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-[url('/images/home.png')]">
      {/* Logo */}
      <div className="pt-6 px-6 sm:px-10">
        <img
          className="w-24 sm:w-32"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="Uber"
        />
      </div>

      {/* Bottom Card */}
      <div className="bg-white px-6 py-8 rounded-t-3xl shadow-xl sm:px-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Get Started with Uber
        </h1>

        <Link
          to={"/login"}
          className="flex items-center justify-center gap-2 mt-6 w-full py-3 text-white text-lg sm:text-xl bg-black rounded-xl hover:bg-gray-900 transition"
        >
          Continue
          <FaArrowRight className="text-base sm:text-lg" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
