import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4">

      <div className="bg-gray-800  bg-opacity-50 p-6 rounded-2xl shadow-lg text-center">
        <h1 className="text-5xl font-bold text-blue-400 mt-12">Welcome to Expense Tracker</h1>

        <p className="text-3xl font-bold
           text-gray-300 mt-6">
          Start Tracking Your Expenses
        </p>

        <Link to="/Tracker">
          <button
            className="text-2xl mt-10 px-6 py-3 bg-blue-500 hover:bg-blue-600  text-white font-semibold rounded-2xl shadow-lg mb-5"
          >
            Start Tracking
          </button></Link>
      </div>
    </div>
  )
}

export default Home
