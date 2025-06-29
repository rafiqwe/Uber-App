import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import CaptainDetails from "../components/CaptainDetails";
import CaptainRidePopup from "../components/CaptainRidePopup";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CaptainConfirmRidePopup from "../components/CaptainConfirmRidePopup";
const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopupPanel]);

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
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed z-10  bottom-0 rounded-t-3xl  bg-white px-2 py-8 w-full "
      >
        <CaptainRidePopup
          setridePopupPanel={setridePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed z-10  bottom-0 h-screen rounded-t-3xl  bg-white px-2 py-8 w-full "
      >
        <CaptainConfirmRidePopup
          setridePopupPanel={setridePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
