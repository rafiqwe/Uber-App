import React from "react";
import { FaLocationDot } from "react-icons/fa6";
const LocationSearchPalen = ({ setvehiclePanel, setPalenOpen }) => {
  const localtion = [
    "34RT, North Mawna sheepur, Gazipur",
    "34RT, North Mawna sheepur, Gazipur",
    "34RT, North Mawna sheepur, Gazipur",
    "34RT, North Mawna sheepur, Gazipur",
    "34RT, North Mawna sheepur, Gazipur",
  ];
  return (
    <>
      <div className="flex flex-col gap-2 ">
        {localtion.map((locat, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setvehiclePanel(true);
                setPalenOpen(false);
              }}
              className="flex border-2 border-gray-100 active:border-black rounded-2xl p-3 items-center gap-4"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-500">
                <FaLocationDot className="text-white" />
              </div>
              <h2> {locat}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LocationSearchPalen;
