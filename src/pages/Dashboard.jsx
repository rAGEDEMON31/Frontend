import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext';
import { Link } from 'react-router'; // update import
import axios from 'axios';
import Navbar2 from '../components/Navbar2';

const Dashboard = () => {
  const [checkedIn, setCheckIn] = useState(false);
  const [checkedOut, setCheckOut] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const { user } = useUser();
  useEffect(() => {
    setCheckIn(false);
    setCheckOut(false);
  })
  const checkIn = async (event) => {
    event.preventDefault()
    await axios.post("http://localhost:8081/api/employee/checkIn", { employeeid: user._id }).then((response) => {
      setCheckIn(true)
      console.log(checkedIn, "  ", checkedOut);

    })
  }
  const checkOut = async (event) => {
    event.preventDefault()
    await axios.post("http://localhost:8081/api/employee/checkOut", { employeeid: user._id }).then((response) => {
      setCheckOut(true)
      console.log(response);
    })
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100">
      <Navbar2 />
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6">
          <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-2">
            Welcome to the Dashboard
          </h1>
          <p className="text-lg text-gray-700 text-center mb-2">
            Hello, <span className="font-semibold text-blue-600">{user.name}</span>!
          </p>
          <p className="text-md text-gray-600 text-center mb-4">
            Today's Date: <span className="font-medium">{date}</span>
          </p>
          {/* <div className="flex flex-row gap-4 w-full justify-center">
            <button
              className={`py-2 px-6 rounded-lg font-semibold shadow transition 
              ${checkedIn ? "bg-green-400 text-white cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
              onClick={checkIn}
              disabled={checkedIn}
            >
              {checkedIn ? "Checked In" : "Check In"}
            </button>
            <button
              className={`py-2 px-6 rounded-lg font-semibold shadow transition 
              ${checkedOut ? "bg-red-400 text-white cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600 text-white"}`}
              onClick={checkOut}
              disabled={checkedOut}
            >
              {checkedOut ? "Checked Out" : "Check Out"}
            </button>
          </div> */}
          <div className="flex flex-row gap-4 w-full justify-center">
            <Link
              to="/weekly"
              className="py-2 px-6 rounded-lg font-semibold shadow transition bg-blue-600 hover:bg-blue-700 text-white"
            >
              Weekly Attendance
            </Link>
            <Link
              to="/leaves"
              className="py-2 px-6 rounded-lg font-semibold shadow transition bg-green-600 hover:bg-green-700 text-white"
            >
              Leaves
            </Link>
          </div>
          <div className="w-full mt-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-blue-50 rounded-lg p-4 text-center shadow">
              <p className="font-semibold text-blue-700">Your Leaves</p>
              {/* You can add leave stats here */}
              <span className="text-2xl font-bold text-blue-600">{user.leaveBalance}</span>
            </div>
            <div className="flex-1 bg-green-50 rounded-lg p-4 text-center shadow">
              <p className="font-semibold text-green-700">Attendance</p>
              <span className="text-2xl font-bold text-green-600">
                {checkedIn && !checkedOut ? "Present" : checkedOut ? "Checked Out" : "Not Checked In"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
