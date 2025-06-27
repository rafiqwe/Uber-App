import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
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

    const newUser = {
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      email: formData.email,
      password: formData.password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    // console.log("Signup Data:", newUser, response);

    if (response.status === 201) {
      const data = response.data;
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
    // You can plug in your backend API here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full  my-10 max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        {/* Uber Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
            className="h-8 sm:h-10"
          />
        </div>

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
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200   border-none"
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
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200   border-none"
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
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200   border-none"
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
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200   border-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Sign In
          </Link>
        </p>

        <div className="mt-5">
          <p className="text-[11px] text-gray-400">
            By proceeding,you consent to get calls, WhatsApp or SMS
            messages,incloding by automated means,from Uber and its affiliates
            to the number provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
