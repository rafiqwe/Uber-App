import React from "react";
import { MdOutlineAvTimer } from "react-icons/md";
import { IoMdSpeedometer } from "react-icons/io";
import { PiNotePencilBold } from "react-icons/pi";
const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between pt-2 px-2">
        <div className="flex items-center justify-start gap-2">
          <img
            className="w-10 h-10 border-2 border-slate-500 rounded-full object-cover"
            src="https://static.vecteezy.com/system/resources/previews/041/642/170/non_2x/ai-generated-portrait-of-handsome-smiling-young-man-with-folded-arms-isolated-free-png.png"
            alt=""
          />
          <h2 className="text-lg font-semibold">Muhammad Rabbi</h2>
        </div>
        <div>
          <h4 className="text-xl font-semibold ">320.10</h4>
          <p className="text-sm text-gray-500">Earned</p>
        </div>
      </div>
      <div className="flex mt-4 items-center justify-center gap-6 bg-slate-200 py-4 px-2 rounded-2xl">
        <div className="text-center flex flex-col items-center justify-center gap-1">
          <MdOutlineAvTimer className="text-3xl  font-thin " />
          <h2 className="text-lg font-medium">10.2</h2>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center flex flex-col items-center justify-center gap-1 ">
          <IoMdSpeedometer className="text-3xl  font-thin " />
          <h2 className="text-lg font-medium">10.2</h2>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center flex flex-col items-center justify-center gap-1">
          <PiNotePencilBold className="text-3xl  font-thin " />
          <h2 className="text-lg font-medium">10.2</h2>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
