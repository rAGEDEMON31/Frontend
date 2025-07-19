import React from 'react'
import Navbar from '../components/Navbar';
import { Link } from 'react-router';
import { AuroraBackground } from '../components/ui/aurora-background';

const HomePage = () => {
  return (
    <AuroraBackground>
      <Navbar />
      <section className="flex flex-1 items-center justify-center min-h-[80vh] px-2">
        <div className="relative bg-[#181c2f]/90 backdrop-blur-xl rounded-2xl shadow-2xl px-4 py-10 sm:px-8 md:px-12 md:py-14 max-w-xl w-full text-center border border-blue-900/10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-800 drop-shadow-lg">
            Welcome!
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-6">
            Employee Management System
          </h2>
          <p className="text-gray-200 mb-8 text-base sm:text-lg">
            Streamline your team's attendance, leaves, and payroll with ease.<br />
            Manage everything in one place.
          </p>
          <Link
            to="/signUp"
            className="inline-block w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg shadow-lg transition-all duration-200"
          >
            Get Started
          </Link>
        </div>
      </section>
    </AuroraBackground>
  );
}

export default HomePage;
