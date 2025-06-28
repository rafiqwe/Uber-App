import React from "react";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { RiCurrencyLine } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
const Riding = () => {
  return (
    <div className="h-screen overflow-hidden ">
      <Link
        to={"/home"}
        className="fixed  right-2 top-2 w-10 h-10 rounded-full bg-white flex items-center justify-center"
      >
        <AiFillHome className="font-bold text-lg " />
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
          alt=""
        />
      </div>
      <div className="h-1/2 p-2">
        <div className="flex justify-around  items-center mb-2">
          <img
            className="h-30"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
            alt="car img"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">MD Rabbi</h2>
            <h3 className="text-2xl font-medium">MR34-231-1</h3>
            <p className="text-sm text-gray-600">Maruti suzuki alto</p>
          </div>
        </div>
        <div className="w-full">
          <div className="flex mb-3 items-center gap-4 w-full border-b-1 p-2  border-gray-400">
            <div className="w-7 h-7 flex items-center justify-center rounded-full">
              <FaMapLocationDot className="text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">542/42-R</h2>
              <h2 className="text-gray-500 text-sm">
                North Mawna sheepur, Gazipur
              </h2>
            </div>
          </div>
          <div className="flex mb-3 items-center gap-4 w-full p-1 ">
            <div className="w-7 h-7 flex items-center justify-center rounded-full">
              <RiCurrencyLine className="text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">192.30 Tk</h2>
              <h2 className="text-gray-500 text-sm">Cash Cash</h2>
            </div>
          </div>
        </div>
        <button className="py-2 bg-green-600 text-white font-semibold w-full rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
