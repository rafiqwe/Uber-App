import React from "react";
import { FaAngleDown, FaUser } from "react-icons/fa";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { RiCurrencyLine } from "react-icons/ri";

const ConfirmRide = ({ setconfirmRide, downIcon2, setvehileFound }) => {
  return (
    <div>
      <div className="absolute top-7 right-5">
        <FaAngleDown
          onClick={() => {
            setconfirmRide(false);
          }}
          ref={downIcon2}
          className="text-lg"
        />
      </div>
      <h1 className="text-2xl font-bold mb-5">Confirm Your Ride </h1>
      <div className="flex justify-center items-center gap-2 flex-col ">
        <div>
          <img
            className="h-30"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
            alt="car img"
          />
        </div>
        <div className="w-full">
          <div className="flex mb-3 items-center gap-4 w-full border-b-1 p-2  border-gray-400">
            <div className="w-7 h-7 flex items-center justify-center rounded-full">
              <FaLocationDot className="text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">542/42-R</h2>
              <h2 className="text-gray-500 text-sm">
                North Mawna sheepur, Gazipur
              </h2>
            </div>
          </div>
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
          <div className="flex mb-3 items-center gap-4 w-full p-2 ">
            <div className="w-7 h-7 flex items-center justify-center rounded-full">
              <RiCurrencyLine className="text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">192.30 Tk</h2>
              <h2 className="text-gray-500 text-sm">Cash Cash</h2>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setvehileFound(true);
            setconfirmRide(false);
          }}
          className="w-full py-2 mt-1 rounded-3xl bg-green-600 text-lg font-semibold text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
