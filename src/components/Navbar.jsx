import React from 'react'
import { Link, useNavigate } from 'react-router'

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content'>
    <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
            <div><h1 onClick={useNavigate}>EMS</h1></div>
            <div className='flex '>
            <Link to={"/login"} className="btn btn-primary mr-2">Login</Link>
            {/* <Link to={"/signUp"} className="btn btn-secondary ml-2">Sign Up</Link> */}
            </div>
        </div>      
    </div>
    </header>
  )
}

export default Navbar
