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

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await LoginUser({ email, password });
            const { token, role, name } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            if (name) localStorage.setItem("name", name);

            toast.success("Login Successful!");

            if (role === "DOCTOR") {
                navigate("/doctor-dashboard");
            } else if (role === "ADMIN") {
                navigate("/admin-dashboard");
            } else if (role === "HOSPITAL") {
                navigate("/hospital-dashboard");
            } else {
                navigate("/patient-dashboard");
            }

        } catch (err) {
            toast.error(err.message || "Login failed");
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 pt-24">
            <div className="bg-white/80 backdrop-blur-xl w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500">Sign in to your MedNext account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-sm font-bold text-gray-700">Password</label>
                            <Link to="/forgot-password" size="sm" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
                                Forgot?
                            </Link>
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-xs py-3 px-4 rounded-xl text-center font-medium animate-shake">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 disabled:bg-gray-400 shadow-lg shadow-indigo-200 transition-all duration-300 flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : "Sign In"}
                        </button>

                        <div className="text-center">
                            <p className="text-gray-500 text-sm">
                                New to MedNext?{" "}
                                <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;