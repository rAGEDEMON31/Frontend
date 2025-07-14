import React from 'react'
import { Link, useNavigate } from 'react-router'

const Navbar2 = () => {
  const navigate=useNavigate()
  return (
    <header className='bg-base-300 border-b border-base-content'>
    <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
            <div><h1 className="cursor-pointer text-lg font-bold">EMS</h1></div>
            <div className='flex '>
            <Link to={"/Myinfo"} className="btn btn-primary mr-2">My Info</Link>
            <Link to={"/weekly"} className="btn btn-primary mr-2">Check In</Link>
            <Link to={"/"} className="btn btn-secondary ml-2">Logout</Link>
            </div>
        </div>      
    </div>
    </header>
  )
}

export default Navbar2
