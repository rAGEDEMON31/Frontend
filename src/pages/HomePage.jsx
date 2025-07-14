import React from 'react'
import Navbar from '../components/Navbar';
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-sky-100 to-white">
      <Navbar />
      <section className="flex flex-1 items-center justify-center">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-10 max-w-xl w-full text-center">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4">Welcome!</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Employee Management System
          </h2>
          <p className="text-gray-600 mb-8">
            Streamline your team's attendance, leaves, and payroll with ease. Manage everything in one place.
          </p>
          <Link
            to="/signUp"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg shadow transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
