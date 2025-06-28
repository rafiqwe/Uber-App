import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaAngleDown } from "react-icons/fa";
import LocationSearchPalen from "../components/LocationSearchPalen";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [formData, setFormData] = useState({
    pickUp: "",
    destination: "",
  });
  const [palenOpen, setPalenOpen] = useState(false);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRide, setconfirmRide] = useState(false);
  const [vehileFound, setvehileFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(true);
  const palenRef = useRef(null);
  const downIcon = useRef(null);
  const downIcon2 = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmPanelRef = useRef(null);
  const vehicleFundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("location", formData);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
        className="w-17 absolute top-5 left-5"
      />
      <div
        className="h-screen w-screen"
        onClick={() => {
          setvehiclePanel(false);
        }}
      >
        <img
          className="h-full w-full object-cover"
          src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
          alt=""
        />
      </div>
      <div className="absolute top-0 flex flex-col justify-end h-screen transition-all">
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
            <div className="line w-1 h-17 bg-gray-500 rounded-full absolute top-[26%] left-7"></div>
            <input
              onClick={() => {
                setPalenOpen(true);
              }}
              className="px-12 py-3 outline-amber-300 rounded-lg text-base bg-[#eee] my-2 w-full"
              type="text"
              placeholder="Add a pick-up location"
              name="pickUp"
              value={formData.pickUp}
              onChange={handleChange}
            />
            <input
              onClick={() => {
                setPalenOpen(true);
              }}
              className="px-12 py-3 outline-amber-300 rounded-lg text-base bg-[#eee] my-2 w-full"
              type="text"
              name="destination"
              placeholder="Enter your destination"
              value={formData.destination}
              onChange={handleChange}
            />
          </form>
        </div>
        <div ref={palenRef} className="bg-white text-black">
          <LocationSearchPalen
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
          downIcon2={downIcon2}
          setvehiclePanel={setvehiclePanel}
        />
      </div>
      <div
        ref={confirmPanelRef}
        className="fixed z-10  bottom-0 rounded-t-3xl  translate-y-full bg-white px-3 py-6 w-full"
      >
        <ConfirmRide
          setconfirmRide={setconfirmRide}
          setvehileFound={setvehileFound}
          downIcon2={downIcon2}
        />
      </div>

      <div
        ref={vehicleFundRef}
        className="fixed z-10  bottom-0 translate-y-full rounded-t-3xl  bg-white px-3 py-6 w-full"
      >
        <LookingForDriver
          downIcon2={downIcon2}
          setvehileFound={setvehileFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed z-10  bottom-0 rounded-t-3xl  bg-white px-3 py-8 w-full "
      >
        <WaitingForDriver
          setwaitingForDriver={setwaitingForDriver}
          downIcon2={downIcon2}
        />
      </div>
    </div>
  );
};

export default Home;
