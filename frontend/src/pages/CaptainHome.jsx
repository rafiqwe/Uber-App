import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import CaptainDetails from "../components/CaptainDetails";
import CaptainRidePopup from "../components/CaptainRidePopup";
import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CaptainConfirmRidePopup from "../components/CaptainConfirmRidePopup";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import MapComponent from "../components/MapComponent";

const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const [confirmRide, setConfirmRide] = useState(null);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const { captain } = useContext(CaptainDataContext);
  const { sendMessage, onMessage } = useContext(SocketContext);

  useEffect(() => {
    sendMessage("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Current location:", captain._id, latitude, longitude);
            sendMessage("update-location-captain", {
              captainId: captain._id,
              location: { ltd: latitude, lng: longitude },
            });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }
    };
    const interval = setInterval(updateLocation, 10000);
    return () => clearInterval(interval);
  }, [sendMessage, captain._id]);

  useEffect(() => {
    const unsubscribe = onMessage("new-ride", (data) => {
      console.log("New ride request received:", data);
      setRide(data);
      setridePopupPanel(true);
    });

    return () => {
      unsubscribe(); // Clean up listener on unmount
    };
  }, [onMessage]);

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

  const confirm = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setConfirmRide(response.data);
    setridePopupPanel(false);

    console.log("Ride confirmed:", response.data);
    setConfirmRidePopupPanel(true);
    setridePopupPanel(false);
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="absolute w-full flex items-center justify-between px-4 mt-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
          className="w-14"
        />
        <Link
          to={"/home"}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <IoIosLogOut className="font-bold text-lg" />
        </Link>
      </div>
      <div className="h-3/5">
        <MapComponent className="w-full " />
      </div>
      <div className="h-2/5 p-6 bg-white">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed z-10 bottom-0 rounded-t-3xl bg-white px-2 py-8 w-full"
      >
        <CaptainRidePopup
          confirm={confirm}
          ride={ride}
          setridePopupPanel={setridePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed z-10 bottom-0 h-screen rounded-t-3xl bg-white px-2 py-8 w-full"
      >
        <CaptainConfirmRidePopup
          confirmRide={confirmRide}
          setridePopupPanel={setridePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
