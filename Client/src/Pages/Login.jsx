import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  //  State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  //  Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login submit
  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Validation
    if (!email || !password) {
      setError("All fields are required ");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter valid email ");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters ");
      return;
    }

    // Dummy login check (replace with backend later)
    if (email === "admin@gmail.com" && password === "1234") {
      setError("");
      alert("Login Successful ");

      // redirect after login
      navigate("/");
    } else {
      setError("Invalid email or password ");
    }
  };

  return (
    <div className="flex bg-gray-100 p-6 min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="bg-white shadow max-w-[500px]  m-20 min-h-full mx-auto w-full p-10 rounded-xl bg-white">

        <h2 className="text-center text-2xl font-bold text-gray-700">
          Sign in to your account
        </h2>

        <form onSubmit={handleLogin} className="mt-10 space-y-6">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex gap-4">

            {/* Sign In */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
            >
              Sign In
            </button>

            {/* Sign Up */}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-full cursor-pointer bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Sign Up
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;