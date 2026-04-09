import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../api/auth.api";
import { toast } from "react-toastify";

export default function PatientRegistrationForm() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT", // ✅ default role
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

    if (!form.name.trim()) {
      setError("Enter full name");
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

    setError("");
    setLoading(true);

    try {
      // ✅ SEND EXACT BACKEND FORMAT
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role, // PATIENT
      };

      const response = await RegisterUser(payload);

      console.log("REGISTER RESPONSE:", response);

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
      role: "PATIENT",
    });
    setSubmitted(false);
  };

  // Success Screen
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Registration Successful ✅
          </h2>
          <p className="text-gray-600 mb-4">
            Welcome {form.name}!
          </p>

          <button
            onClick={() => {
              handleReset();
              navigate("/login");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow">

        <h1 className="text-2xl font-bold text-center mb-6">
          Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
}