import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RegisterUser } from "../api/auth.api";
import { toast } from "react-toastify";

export default function RegisterForm() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "PATIENT",
        specialization: "", // For Doctor
        hospitalName: "", // For Hospital
        address: "", // For Hospital
    });

    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.role !== "HOSPITAL" && !form.name.trim()) {
            setError("Enter full name");
            return;
        }

        if (form.role === "HOSPITAL" && !form.hospitalName.trim()) {
            setError("Please enter your hospital name");
            return;
        }

        if (!form.email.includes("@")) {
            setError("Enter valid email");
            return;
        }

        if (!form.password || form.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Role-specific validation
        if (form.role === "DOCTOR" && !form.specialization.trim()) {
            setError("Please enter your specialization");
            return;
        }

        setError("");
        setLoading(true);

        try {
            // ✅ SEND EXACT BACKEND FORMAT
            const payload = {
                name: form.role === "HOSPITAL" ? form.hospitalName : form.name,
                email: form.email,
                password: form.password,
                role: form.role,
                // Backend currently only expects these 4, but we can include others if needed
                // Since we can't change backend, we'll stick to the core fields
            };

            const response = await RegisterUser(payload);

            console.log("REGISTER RESPONSE:", response);

            if (response && response.success === false) {
                throw new Error(response.message || "Registration failed");
            }

            toast.success(response.message || "Registration Successful ✅");

            setSubmitted(true);

        } catch (err) {
            console.log("ERROR:", err);

            toast.error(err.message || "Registration failed");
            setError(err.message || "Something went wrong");

        } finally {
            setLoading(false);
        }
    };

    // Reset
    const handleReset = () => {
        setForm({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "PATIENT",
            specialization: "",
            hospitalName: "",
            address: "",
        });
        setSubmitted(false);
    };

    // Success Screen
    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 pt-24">
                <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 text-center animate-slideUp max-w-md w-full">
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-50 text-green-500 p-5 rounded-3xl border border-green-100">
                            <svg xmlns="http://www.w3.org/2003/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                        Registration Successful
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Welcome to MedNext! Your account as a <span className="font-bold text-indigo-600">{form.role}</span> has been created.
                    </p>

                    <button
                        onClick={() => {
                            handleReset();
                            navigate("/login");
                        }}
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all duration-300"
                    >
                        Continue to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 pt-32 pb-20">
            <div className="bg-white/80 backdrop-blur-xl w-full max-w-lg p-6 rounded-3xl shadow-2xl border border-white/20 animate-slideUp">
                <div className="mb-5 text-center">
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
                        Create Account
                    </h1>
                    <p className="text-gray-500 text-xs">Select your role and fill in your details</p>
                </div>

                {/* Role Selection */}
                <div className="flex gap-2 mb-6">
                    {[
                        { id: "PATIENT", label: "User", icon: "👤" },
                        { id: "DOCTOR", label: "Doctor", icon: "👨‍⚕️" },
                        { id: "HOSPITAL", label: "Hospital", icon: "🏥" }
                    ].map((role) => (
                        <button
                            key={role.id}
                            type="button"
                            onClick={() => setForm({ ...form, role: role.id })}
                            className={`flex-1 flex flex-col items-center gap-1.5 p-2 rounded-2xl border-2 transition-all duration-300 ${form.role === role.id
                                    ? "bg-indigo-50 border-indigo-600 text-indigo-600 shadow-sm"
                                    : "bg-gray-50/50 border-gray-100 text-gray-400 hover:border-gray-200"
                                }`}
                        >
                            <span className="text-xl">{role.icon}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider">{role.label}</span>
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">

                    {form.role !== "HOSPITAL" ? (
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide ml-1">Full Name</label>
                            <input
                                name="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full bg-gray-50/50 border border-gray-200 p-2.5 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-gray-400 text-sm"
                            />
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide ml-1">Hospital Name</label>
                            <input
                                name="hospitalName"
                                placeholder="City General Hospital"
                                value={form.hospitalName}
                                onChange={handleChange}
                                className="w-full bg-gray-50/50 border border-gray-200 p-2.5 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-gray-400 text-sm"
                            />
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide ml-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-gray-50/50 border border-gray-200 p-2.5 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-gray-400 text-sm"
                        />
                    </div>

                    {form.role === "DOCTOR" && (
                        <div className="space-y-1 animate-fadeIn">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide ml-1">Specialization</label>
                            <input
                                name="specialization"
                                placeholder="e.g. Cardiology"
                                value={form.specialization}
                                onChange={handleChange}
                                className="w-full bg-gray-50/50 border border-gray-200 p-2.5 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-gray-400 text-sm"
                            />
                        </div>
                    )}

                    {form.role === "HOSPITAL" && (
                        <div className="space-y-1 animate-fadeIn">
                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide ml-1">Hospital Address</label>
                            <input
                                name="address"
                                placeholder="123 Health Ave, Medical City"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full bg-gray-50/50 border border-gray-200 p-2.5 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-gray-400 text-sm"
                            />
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide ml-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full bg-gray-50/50 border border-gray-200 p-2.5 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-gray-400 text-sm"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide ml-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-gray-50/50 border border-gray-200 p-2.5 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-gray-400 text-sm"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 text-red-600 text-xs py-3 px-4 rounded-xl text-center font-medium animate-shake">
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <div className="space-y-3 pt-1">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-3.5 rounded-2xl font-bold hover:bg-indigo-700 disabled:bg-gray-400 shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : "Create Account"}
                        </button>

                        <div className="text-center">
                            <p className="text-gray-400 text-[13px]">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}