import React, { useState } from "react";
import { FaAngleDown, FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CaptainConfirmRidePopup = ({
  setridePopupPanel,
  setConfirmRidePopupPanel,
}) => {
  const [otp, setOtp] = useState();
  const handleSubit = (e) => {
    e.preventDefault();
    console.log("user otp ", otp);
    
  };
  return (
    <div>
      <div className="absolute top-7 right-5">
        <FaAngleDown
          onClick={() => {
            setridePopupPanel(false);
            setConfirmRidePopupPanel(false);
          }}
          className="text-lg"
        />
      </div>
      <h1 className="text-2xl font-bold mb-5">Confirm this ride to start </h1>

      <div className="flex items-center justify-between  mb-4 p-3 border-2 border-yellow-500 rounded-lg">
        <div className="flex items-center justify-start gap-3 ">
          <img
            className="w-13 h-13 border-2 border-slate-500 rounded-full object-cover"
            src="https://static.vecteezy.com/system/resources/previews/041/642/170/non_2x/ai-generated-portrait-of-handsome-smiling-young-man-with-folded-arms-isolated-free-png.png"
            alt=""
          />
          <h2 className="text-lg font-semibold">Muhammad Rabbi</h2>
        </div>
        <div>
          <h4 className="text-xl font-semibold ">2.8 KM</h4>
          <p className="text-md font-medium text-gray-700">40 Tk</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 flex-col ">
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
          <div className="flex mb-3 items-center gap-4 w-full p-2">
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
        </div>
        <div className=" w-full">
          <form onSubmit={handleSubit}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="px-7 font-mono py-3 outline-amber-300 rounded-lg text-lg bg-[#eee] my-2 w-full mb-8"
            />
            <Link
              to={"/captain-riding"}
              className="w-full flex justify-center items-center py-3  mt-1 rounded-lg bg-green-600 text-lg font-semibold text-white mb-3"
            >
              Confirm Ride
            </Link>
            <button
              onClick={() => {
                setridePopupPanel(false);
                setConfirmRidePopupPanel(false);
              }}
              className="w-full py-3  mt-1 rounded-lg bg-red-500 text-lg font-semibold text-white"
            >
              Cancel Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaptainConfirmRidePopup;
