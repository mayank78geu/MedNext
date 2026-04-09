import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter valid email");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    // Clear previous auth
    localStorage.removeItem("doctorAuth");
    localStorage.removeItem("patientAuth");
    localStorage.removeItem("hospitalAuth");

    // Simple login (you can customize)
    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("doctorAuth", "true"); // treat as doctor
      setError("");
      navigate("/doctor-dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen items-center justify-center px-4">
      <div className="bg-white shadow max-w-[500px] w-full p-10 rounded-xl">
        <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
          Sign in to your account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 cursor-pointer rounded hover:bg-indigo-600"
            >
              Sign In
            </button>

            <Link
              to="/register"
              className="text-center text-blue-600 hover:underline"
            >
              New user? Click here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
