import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientRegistrationForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName) {
      setError("Enter full name");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Enter valid email");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      setError("Enter valid 10 digit phone number");
      return;
    }

    setError("");
    console.log("Form Data:", form);
    setSubmitted(true);
  };

  // Reset
  const handleReset = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
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
            Welcome {form.firstName}!
          </p>

          <button
            onClick={() => {
              handleReset();
              navigate("/login");
            }}
            className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
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

          {/* First Name */}
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Last Name */}
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
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

          {/* Phone */}
          <input
            name="phone"
            placeholder="Phone (10 digits)"
            value={form.phone}
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
            className="w-full bg-blue-600 text-white cursor-pointer py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
}