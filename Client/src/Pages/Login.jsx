import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../api/auth.api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login
  const handleLogin = async (e) => {
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

    setError("");
    setLoading(true);

    try {
      // ✅ API CALL
      const response = await LoginUser({ email, password });

      console.log("LOGIN RESPONSE:", response);

      // Expected response:
      // { status, message, data: { token, role } }

      const token = response.data.token;
      const role = response.data.role;

      // ✅ STORE TOKEN
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Login successful");

      // ✅ ROLE BASED NAVIGATION
      if (role === "DOCTOR") {
        navigate("/doctor-dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/patient-dashboard");
      }

    } catch (err) {
      console.log("ERROR:", err);

      toast.error(err.message || "Login failed");
      setError(err.message || "Invalid email or password");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen items-center justify-center px-4">
      <div className="bg-white shadow max-w-[500px] w-full p-10 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
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
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all duration-300"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all duration-300"
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 disabled:bg-gray-400 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <Link
              to="/register"
              className="text-center text-indigo-600 hover:underline transition-all duration-200"
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