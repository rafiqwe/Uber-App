import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CaptainRegister = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    vehicleType: "",
    vehicleColor: "",
    vehicleCapacity: "",
    plate: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      email: formData.email,
      password: formData.password,
      vehicle: {
        vehicleType: formData.vehicleType,
        color: formData.vehicleColor,
        capacity: formData.vehicleCapacity,
        plate: formData.plate,
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      vehicleType: "",
      vehicleColor: "",
      vehicleCapacity: "",
      plate: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl my-10 rounded-2xl p-6 sm:p-8">
        {/* Uber Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
            className="h-8 sm:h-10"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Captain SignUp
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              placeholder="First Name"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200   border-none "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              placeholder="Last Name"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200   border-none "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email@example.com"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200   border-none "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200   border-none "
            />
          </div>
          <h1>Vehicle Information</h1>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <select
                name="vehicleType"
                value={formData.vehicleType || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>

            <div>
              <input
                type="text"
                name="vehicleColor"
                value={formData.vehicleColor || ""}
                onChange={handleChange}
                required
                placeholder="Vehicle Color"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              />
            </div>

            <div>
              <input
                type="text"
                name="plate"
                value={formData.plate || ""}
                onChange={handleChange}
                required
                placeholder="Plate Number"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              />
            </div>

            <div>
              <input
                type="number"
                name="vehicleCapacity"
                value={formData.vehicleCapacity || ""}
                onChange={handleChange}
                required
                min={1}
                placeholder="Vehicle Capacity"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            Create account as Driver
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?
          <Link
            to="/captain-login"
            className="text-black font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>

        <p className="text-sm text-center mt-4 text-gray-600">
          Not a driver?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Sign in as User
          </Link>
        </p>
        <div className="mt-5">
          <p className="text-[12px] text-gray-400">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Policy</span> and
            <span className="underline"> Terms of Service apply</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainRegister;
