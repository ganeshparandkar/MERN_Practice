import React from 'react';
import { Link } from 'react-router-dom';
const DashBoard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-6">
      {/* Dashboard Title */}
      <div className="text-4xl font-bold text-gray-800 mb-8">Dashboard</div>

      {/* Button */}
      <Link to='/login'>
      <button className="bg-blue-600 text-white font-medium text-lg py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition">
        LogOut
      </button>
      </Link>
    </div>
  );
}

export default DashBoard;
