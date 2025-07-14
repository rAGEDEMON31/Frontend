import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Router, Routes,  } from 'react-router';
import Dashboard from './Dashboard';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';

const Login = () => {
    const {user,setUser} = useUser();
const navigate = useNavigate();
    
    const handleLogin = async(event)=>
    {
        event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);
    await axios.post("https://backend-nv1r.onrender.com/api/employee/login",formValues).then(response=>{
      console.log(response.data);
      try {
        setUser(response.data)
        console.log(user);
        // navigate("/dashboard")
        if (response.data.roles.includes("manager")) {
          navigate("/AdminDashboard")
        }
        else if (response.data.roles.includes("user")) {
          navigate("/dashboard")
        }
      } catch (error) {
          return alert("Invalid credentials")
      }
    })
    }
    
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Sign in to your account</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleLogin}>
        <div>
          <label for="email" className="block text-sm/6 font-medium ">Email address</label>
          <div className="mt-2">
            <input type="email" name="email" id="email" autocomplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label for="password" className="block text-sm/6 font-medium">Password</label>
          </div>
          <div className="mt-2">
            <input type="password" name="pass" id="password" autocomplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login
