import { FaMapLocationDot } from "react-icons/fa6";
import { RiCurrencyLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineAvTimer } from "react-icons/md";
import { IoMdSpeedometer } from "react-icons/io";
import { PiNotePencilBold } from "react-icons/pi";
const CaptainHome = () => {
  return (
    <div className="h-screen overflow-hidden ">
      <div className="absolute w-full flex items-center justify-between px-4 mt-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="w-14 "
        />
        <Link
          to={"/home"}
          className=" w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <IoIosLogOut className="font-bold text-lg " />
        </Link>
      </div>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
          alt=""
        />
      </div>
      <div className="h-1/2 p-2">
        <div>
          <div>
            <img src="" alt="" />
            <h2>Muhammad Rabbi</h2>
          </div>
          <div>
            <h4>320.10</h4>
            <p>Earned</p>
          </div>
        </div>
        <div className="flex mt-8 items-center justify-between">
          <div className="text-center ">
            <MdOutlineAvTimer className="text-2xl text-center font-thin " />
            <h2 className="text-lg font-medium">10.2</h2>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <IoMdSpeedometer />
            <h2 className="text-lg font-medium">10.2</h2>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <PiNotePencilBold />
            <h2 className="text-lg font-medium">10.2</h2>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
