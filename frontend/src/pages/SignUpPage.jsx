import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {

  const [email,setEmail] = useState('')
  const [pass1,SetPass1] = useState('')
  const [pass2,SetPass2] = useState('')

  const Navigate = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(email,pass1,pass2)

    Navigate('/')
  
  }


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      {/* Header Section */}
      <div className="Heading mb-10 text-center">
        <div className="mainHeading text-3xl font-bold text-gray-800 mb-2">Sign Up</div>
        <div className="subheading text-gray-600 text-lg">Create your account to get started.</div>
      </div>

      {/* Sign Up Form Section */}
      <form className="max-w-md w-full bg-white shadow-lg rounded-lg py-8 px-6"
      onSubmit={handleSubmit}
      method='POST'
      >
        {/* Email Input */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="name@example.com"
            required
            autoComplete='email'
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Your Password
          </label>
          <input
            type="password"
            id="password"
            value={pass1}
            onChange={(e)=>{SetPass1(e.target.value)}}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            required
            autoComplete='pass1'
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={pass2}
            onChange={(e)=>{
              SetPass2(e.target.value)
            }}
            autoComplete='pass2'
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium text-sm py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
