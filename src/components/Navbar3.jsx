import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useUser } from '../context/UserContext'

const Navbar3 = () => {
  const navigate = useNavigate()
  const { user } = useUser();
  const handleNav = () => {
    if (user.roles.includes("manager")) {
      navigate("/AdminDashboard")
    }
    else if (user.roles.includes("user")) {
      navigate("/dashboard")
    }
  }
  return (
    <header className='bg-base-300 border-b border-base-content'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <div><h1 onClick={handleNav} className="cursor-pointer text-lg font-bold">EMS</h1></div>
          <div className='flex '>
            <button onClick={handleNav} className="btn btn-primary mr-2">Back</button>
            <Link to={"/"} className="btn btn-secondary ml-2">Logout</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar3;