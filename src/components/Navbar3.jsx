import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useUser } from '../context/UserContext'

const Navbar3 = () => {
  const navigate = useNavigate()
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    if (user.roles.includes("manager")) {
      navigate("/AdminDashboard")
    }
    else if (user.roles.includes("user")) {
      navigate("/dashboard")
    }
  }
  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-[#181c2f]/70 backdrop-blur-md border-b border-blue-900/20 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <h1
            onClick={handleNav}
            className="cursor-pointer text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700 tracking-tight"
          >
            EMS
          </h1>
          {/* Hamburger for mobile */}
          <button
            className="sm:hidden flex flex-col justify-center items-center w-10 h-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-white mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-white mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          {/* Desktop menu */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={handleNav}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
            >
              Back
            </button>
            <Link to="/" className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white font-semibold shadow transition">
              Logout
            </Link>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="flex flex-col gap-2 mt-3 sm:hidden animate-fade-in-down">
            <button
              onClick={() => { handleNav(); setMenuOpen(false); }}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
            >
              Back
            </button>
            <Link
              to="/"
              className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white font-semibold shadow transition"
              onClick={() => setMenuOpen(false)}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
export default Navbar3;