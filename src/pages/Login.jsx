import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaStethoscope } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  // Hardcoded credentials
  const validEmail = "admin@gmail.com";
  const validPassword = "12345";

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === validEmail && password === validPassword) {
      setError("");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9ecd4d]/10 to-[#9ecd4d]/30">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* Logo + Title */}
        <div className="flex items-center justify-start gap-2 mb-4">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#0f766e"
            className="w-7 h-7 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg> */}
          <FaStethoscope className="text-[#9ecd4d] text-xl" />
          <h2 className="text-[#9ecd4d] font-bold text-2xl">My Florida Green</h2>
        </div>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm text-left mb-6">
          Secure access to your healthcare dashboard
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mb-4 rounded-md border border-gray-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#8BB453]"
            required
          />

          {/* Password */}
          <div className="flex justify-between items-center mb-1">
            <label className="text-gray-700 text-sm font-medium">
              Password
            </label>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mb-6 rounded-md border border-gray-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#8BB453]"
            required
          />

          {/* Sign In Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-[#9ecd4d] hover:bg-[#8BB453] text-white font-medium py-2 rounded-md flex items-center justify-center gap-4 shadow-sm transition"
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg> */}
            <AiOutlineSafetyCertificate />
            Sign in
          </button>
        </form>

        {/* Terms */}
        <p className="text-gray-400 text-xs text-center mt-4">
          By continuing you agree to our{" "}
          <a href="#" className="underline hover:text-gray-500">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-gray-500">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
