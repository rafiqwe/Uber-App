import { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [formData, setFormData] = useState({
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
    console.log("Submitted:", formData);
    setFormData({
      email: "",
      password: "",
    });
    // you can connect API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full  my-10 max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
            className="h-8 sm:h-10"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Sign in to Uber
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200   border-none "
              required
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200   border-none "
              required
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-black font-medium">
            Sign up
          </Link>
        </p>

        <div>
          <Link
            to={"/captain-login"}
            className="w-full flex items-center justify-center mt-8 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Sign In as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
