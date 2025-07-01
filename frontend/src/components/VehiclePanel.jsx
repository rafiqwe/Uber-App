import React from "react";
import { FaAngleDown, FaUser } from "react-icons/fa";

const VehiclePanel = ({ downIcon2, setvehiclePanel, setconfirmRide ,fare, createRide}) => {
  return (
    <div>
      <div className="absolute top-7 right-5">
        <FaAngleDown
          onClick={() => {
            setvehiclePanel(false);
          }}
          ref={downIcon2}
          className="text-lg"
        />
      </div>
      <h1 className="text-2xl font-bold mb-5">Choose a Vehicle</h1>
      <div
        onClick={() => {
          setconfirmRide(true);
          setvehiclePanel(false);
          createRide("car");
        }}
        className="flex active:border-2 border-black bg-gray-100 mb-2 rounded-xl justify-between items-center p-3 w-full"
      >
        <img
          className="h-15"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
          alt="car img"
        />
        <div className="w-1/2">
          <h2 className="flex gap-3 items-center font-medium text-base">
            UberGO
            <span className="flex gap-1 items-center">
              <FaUser />4
            </span>
          </h2>
          <h2 className="text-sm font-medium">2min away</h2>
          <h2 className="text-xs text-gray-600">affordable, compect rides</h2>
        </div>
        <h2 className="font-semibold text-lg">{fare.car} Tk</h2>
      </div>
      <div
        onClick={() => {
          setconfirmRide(true);
          setvehiclePanel(false);
          createRide("auto");

        }}
        className="flex active:border-2 border-black bg-gray-100 mb-2 rounded-xl justify-between items-center p-3 w-full"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt="car img"
        />
        <div className="w-1/2">
          <h2 className="flex gap-3 items-center font-medium text-base">
            UberGO
            <span className="flex gap-1 items-center">
              <FaUser />4
            </span>
          </h2>
          <h2 className="text-sm font-medium">2min away</h2>
          <h2 className="text-xs text-gray-600">affordable, Auto rides</h2>
        </div>
        <h2 className="font-semibold text-lg">{fare.auto} Tk</h2>
      </div>
      <div
        onClick={() => {
          setconfirmRide(true);
          setvehiclePanel(false);
          createRide("moto");
        }}
        className="flex active:border-2 border-black bg-gray-100 mb-2 rounded-xl justify-between items-center p-3 w-full"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png"
          alt="car img"
        />
        <div className="w-1/2">
          <h2 className="flex gap-3 items-center font-medium text-base">
            UberGO
            <span className="flex gap-1 items-center">
              <FaUser />1
            </span>
          </h2>
          <h2 className="text-sm font-medium">3min away</h2>
          <h2 className="text-xs text-gray-600">affordable, motocycle rides</h2>
        </div>
        <h2 className="font-semibold text-lg">{fare.moto} Tk</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
