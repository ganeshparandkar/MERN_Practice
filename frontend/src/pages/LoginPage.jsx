import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const Navigate = useNavigate()



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    if(email =='shriyash' && password == 'shriyash'){
        Navigate('/')
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      {/* Header Section */}
      <div className="Heading mb-10 text-center">
        <div className="mainHeading text-3xl font-bold text-gray-800 mb-2">
          Login Form
        </div>
        <div className="subheading text-gray-600 text-lg">
          Create an account to get started.
        </div>
      </div>

      {/* Form Section */}
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white shadow-lg rounded-lg py-8 px-6"
      >
        {/* Email Input */}
        <div className="mb-6">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="name@example.com"
            required
            autoComplete="email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            required
            autoComplete='password'
          />
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center mb-6">
          <input
            id="remember"
            type="checkbox"
            value={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium text-sm py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
