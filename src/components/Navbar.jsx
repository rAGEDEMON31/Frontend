import React from 'react'
import { Link, useNavigate } from 'react-router'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-[#181c2f]/70 backdrop-blur-md border-b border-blue-900/20 shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-3">
        <div className="flex items-center justify-between">
          <h1
            onClick={() => navigate('/')}
            className="cursor-pointer text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700 tracking-tight"
          >
            EMS
          </h1>
          <div className="flex">
            <Link
              to="/login"
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
            >
              Login
            </Link>
            {/* <Link to={"/signUp"} className="btn btn-secondary ml-2">Sign Up</Link> */}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
