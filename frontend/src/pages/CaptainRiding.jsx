import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { IoIosLogOut, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
const CaptainRiding = () => {
  const [finishRide, setfinishRide] = useState(false);
  const finishRideRef = useRef(null);

  useGSAP(() => {
    if (finishRide) {
      gsap.to(finishRideRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRide]);
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
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
          alt=""
        />
      </div>
      <div
        onClick={() => {
          setfinishRide(true);
        }}
        className="h-1/5 p-4  bg-yellow-400"
      >
        <div className="w-full  flex items-center justify-center mb-6 -mt-2 ">
          <IoIosArrowUp className="text-xl" />
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">4 KM away</h3>
          <button className="bg-green-500 text-white font-semibold p-3 px-10 rounded-lg text-lg">
            Finish Ride
          </button>
        </div>
      </div>
      <div
        ref={finishRideRef}
        className="fixed z-10  bottom-0  rounded-t-3xl  bg-white px-2 py-8 w-full "
      >
        <FinishRide setfinishRide={setfinishRide} />
      </div>
    </div>
  );
};

export default CaptainRiding;
