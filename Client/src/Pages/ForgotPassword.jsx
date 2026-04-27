import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ForgotPassword as forgotPasswordApi } from "../api/auth.api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await forgotPasswordApi(email);
      setSubmitted(true);
      toast.success("Reset link sent to your email");
    } catch (err) {
      toast.error(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-screen items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl max-w-[450px] w-full p-8 rounded-3xl border border-white/20 animate-slideUp">
        <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                Forgot Password?
            </h2>
            <p className="text-gray-500 text-sm">No worries, we'll send you reset instructions.</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 p-3.5 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all duration-300 placeholder:text-gray-400"
                />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 disabled:bg-gray-400 shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : "Send Reset Link"}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2003/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-6 animate-fadeIn">
            <div className="flex justify-center">
                <div className="bg-green-50 text-green-500 p-5 rounded-3xl border border-green-100">
                    <svg xmlns="http://www.w3.org/2003/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">Check your email</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                    We've sent a password reset link to <span className="font-semibold text-gray-700">{email}</span>.
                </p>
            </div>
            <div className="pt-2">
                <Link
                to="/login"
                className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all duration-300"
                >
                Return to Login
                </Link>
            </div>
            <p className="text-xs text-gray-400">
                Didn't receive the email? Check your spam folder or{" "}
                <button onClick={() => setSubmitted(false)} className="text-indigo-600 font-bold hover:underline">try again</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
