import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaAngleDown } from "react-icons/fa";
import LocationSearchPalen from "../components/LocationSearchPalen";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios"; // <-- Add axios import
import { SocketContext } from "../context/SocketContext"; // <-- Import SocketContext
import { useContext } from "react"; // <-- Import useContext
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import { LiveTracking } from "../components/LiveTracking";

const Home = () => {
  const [formData, setFormData] = useState({
    pickUp: "",
    destination: "",
  });
  const [palenOpen, setPalenOpen] = useState(false);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRide, setconfirmRide] = useState(false);
  const [vehileFound, setvehileFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // <-- Add suggestions state
  const [activeField, setActiveField] = useState(""); // <-- Track which field is active
  const [rideConfirm, setrideConfirm] = useState(null);

  const [fare, setFare] = useState([]);
  const [confirmFare, setConfirmFare] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const { sendMessage, onMessage } = useContext(SocketContext); // <-- Use SocketContext
  const { user } = useContext(UserDataContext); // <-- Use UserDataContext

  const palenRef = useRef(null);
  const downIcon = useRef(null);
  const downIcon2 = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmPanelRef = useRef(null);
  const vehicleFundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const navigate = useNavigate();
  useEffect(() => {
    sendMessage("join", { userType: "user", userId: user._id });
    // console.log("User ID:", user._id);
  }, [user]);

  onMessage("ride-confirmed", (data) => {
    console.log("New ride confirmed:", data);
    setrideConfirm(data);
    setwaitingForDriver(true);
  });

  onMessage("ride-started", (data) => {
    console.log("New ride start:", data);
    setwaitingForDriver(false);
    navigate("/riding", { state: { ride: data } }); // Pass ride data here
  });

  // Fetch suggestions from backend
  const fetchSuggestions = async (input) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/maps/get-suggestions?input=${encodeURIComponent(input)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuggestions(res.data);
    } catch (err) {
      console.log(err);

      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setActiveField(name); // Track which field is being edited
    fetchSuggestions(value); // Fetch suggestions for the current input
    setPalenOpen(true); // Open the suggestion panel
  };

  // When user clicks a suggestion
  const handleSuggestionClick = (suggestion) => {
    if (activeField) {
      setFormData((prev) => ({
        ...prev,
        [activeField]: suggestion.display_name || suggestion,
      }));
    }
    setSuggestions([]);
  };

  useGSAP(() => {
    if (palenOpen) {
      gsap.to(palenRef.current, {
        height: "70%",
        padding: 20,
      });
      gsap.to(downIcon.current, {
        opacity: "1",
      });
      gsap.to(downIcon2.current, {
        opacity: "0",
      });
    } else {
      gsap.to(palenRef.current, {
        height: "0",
        padding: 0,
      });
      gsap.to(downIcon.current, {
        opacity: "0",
      });
      gsap.to(downIcon2.current, {
        opacity: "1",
      });
    }
  }, [palenOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRide) {
      gsap.to(confirmPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRide]);

  useGSAP(() => {
    if (vehileFound) {
      gsap.to(vehicleFundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehileFound]);
  useGSAP(() => {
    if (confirmRide) {
      gsap.to(confirmPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRide]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  const confirmFareFuc = async (vehicleType) => {
    const fare = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/ride/get-fare`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          pickup: formData.pickUp,
          destination: formData.destination,
          vehicleType: vehicleType,
        },
      }
    );
    setConfirmFare(fare.data.fare);
    setconfirmRide(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pickUp || !formData.destination) {
      alert("Please fill in both pick-up and destination fields.");
      return;
    }

    const rideVehicleType = ["car", "auto", "moto"];
    const allFare = await Promise.all(
      rideVehicleType.map(async (type) => {
        const fare = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/ride/get-fare`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              pickup: formData.pickUp,
              destination: formData.destination,
              vehicleType: type,
            },
          }
        );
        return {
          [type]: fare.data.fare,
        };
      })
    );
    setFare(
      allFare.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {})
    );

    setvehiclePanel(true);
    setPalenOpen(false);
  };

  const createRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/create`,
      {
        pickup: formData.pickUp,
        destination: formData.destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Ride created:", response.data);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
        className="w-17 absolute top-5 left-5"
      />
      <div className="h-screen w-screen">
        <MapComponent className="w-full " />
      </div>
      <div className=" z-10 absolute top-0 flex flex-col justify-end h-screen transition-all">
        <div className="bg-white h-[30%] w-full p-5  relative">
          <div className="absolute top-7 right-5">
            <FaAngleDown
              onClick={() => {
                setPalenOpen(false);
              }}
              ref={downIcon}
              className="text-lg"
            />
          </div>
          <h1 className="text-2xl font-semibold mb-3">Find to trip</h1>
          <form className="relative" onSubmit={handleSubmit}>
            <div className="line w-1 h-17 bg-gray-500 rounded-full absolute top-7 left-7"></div>
            <input
              onClick={() => {
                setPalenOpen(true);
                setActiveField("pickUp");
                fetchSuggestions(formData.pickUp);
              }}
              className="px-12 py-3 outline-amber-300 rounded-lg text-base bg-[#eee] my-2 w-full"
              type="text"
              placeholder="Add a pick-up location"
              name="pickUp"
              value={formData.pickUp}
              onChange={handleChange}
              autoComplete="off"
            />
            <input
              onClick={() => {
                setPalenOpen(true);
                setActiveField("destination");
                fetchSuggestions(formData.destination);
              }}
              className="px-12 py-3 outline-amber-300 rounded-lg text-base bg-[#eee] my-2 w-full"
              type="text"
              name="destination"
              placeholder="Enter your destination"
              value={formData.destination}
              onChange={handleChange}
              autoComplete="off"
            />

            <button
              type="submit"
              className="w-full mt-4 py-3 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-900 transition-colors"
            >
              Find Trip
            </button>
          </form>
        </div>
        <div ref={palenRef} className="bg-white text-black">
          <LocationSearchPalen
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            setvehiclePanel={setvehiclePanel}
            setPalenOpen={setPalenOpen}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed z-10  bottom-0 translate-y-full rounded-t-3xl bg-white px-3 py-6 w-full"
      >
        <VehiclePanel
          setconfirmRide={setconfirmRide}
          setVehicleType={setVehicleType}
          downIcon2={downIcon2}
          setvehiclePanel={setvehiclePanel}
          fare={fare}
          confirmFareFuc={confirmFareFuc}
        />
      </div>
      <div
        ref={confirmPanelRef}
        className="fixed z-10  bottom-0 rounded-t-3xl  translate-y-full bg-white px-3 py-6 w-full"
      >
        <ConfirmRide
          fare={fare}
          pickup={formData.pickUp}
          destination={formData.destination}
          createRide={createRide}
          setconfirmRide={setconfirmRide}
          setvehileFound={setvehileFound}
          downIcon2={downIcon2}
          confirmFare={confirmFare}
        />
      </div>

      <div
        ref={vehicleFundRef}
        className="fixed z-10  bottom-0 translate-y-full rounded-t-3xl  bg-white px-3 py-6 w-full"
      >
        <LookingForDriver
          pickup={formData.pickUp}
          destination={formData.destination}
          downIcon2={downIcon2}
          setvehileFound={setvehileFound}
          confirmFare={confirmFare}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed z-10  bottom-0 rounded-t-3xl  bg-white px-3 py-8 w-full "
      >
        <WaitingForDriver
          rideConfirm={rideConfirm}
          setwaitingForDriver={setwaitingForDriver}
          downIcon2={downIcon2}
        />
      </div>
    </div>
  );
};

export default Home;
