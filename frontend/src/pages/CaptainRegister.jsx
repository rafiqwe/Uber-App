import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainRegister = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Driver logging in:", formData);
    // Integrate your backend API here
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

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            Sign In as Driver
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

