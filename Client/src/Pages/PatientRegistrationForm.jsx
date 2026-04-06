import { useState } from "react";

const steps = ["Personal Info", "Contact"];

export default function PatientRegistrationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // ndle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // lidation function
  const validateStep = () => {
    if (step === 0) {
      if (!form.firstName || !form.lastName) {
        alert("Enter full name ");
        return false;
      }
      if (!form.dob) {
        alert("Select date of birth ");
        return false;
      }
      if (!form.gender) {
        alert("Select gender ");
        return false;
      }
    }

    if (step === 1) {
      if (!form.email.includes("@")) {
        alert("Enter valid email ");
        return false;
      }
      if (!/^[0-9]{10}$/.test(form.phone)) {
        alert("Enter valid phone number ");
        return false;
      }
      if (!form.address || !form.city) {
        alert("Fill address ");
        return false;
      }
    }

    return true;
  };

  //  Next button
  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  //  Submit function
  const handleSubmit = () => {
    if (!validateStep()) return;

    console.log("Form Submitted:", form);
    setSubmitted(true);
  };

  // Reset form
  const handleReset = () => {
    setForm({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      bloodGroup: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    });
    setStep(0);
    setSubmitted(false);
  };

  //  Success Screen
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
            onClick={handleReset}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Register Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Patient Registration
        </h1>

        {/* Step Indicator */}
        <div className="flex justify-between mb-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`text-sm font-semibold ${
                i === step ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 0 && (
          <div className="space-y-4">
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <div className="space-y-4">
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Back
            </button>
          )}

          {step < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>

      </div>
    </div>
  );
}