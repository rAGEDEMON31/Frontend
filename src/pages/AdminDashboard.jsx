import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext';
import { Link } from 'react-router';
import axios from 'axios';
import Navbar3 from '../components/Navbar3';
import Navbar2 from '../components/Navbar2';



const AdminDashboard = () => {
  const { user } = useUser(); // Ensure this is properly set on login
  const [leaveApprovals, setLeaveApprovals] = useState([]);
  const [timeApprovals, setTimeApprovals] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchApprovals();
    fetchTeam();
  }, []);

  const fetchApprovals = async () => {
    const config = { username: user.username };
    const leave = await axios.get(`https://backend-nv1r.onrender.com/api/manager/leaveApprovals/${user.username}`);
    const time = await axios.get(`https://backend-nv1r.onrender.com/api/manager/timeApprovals/${user.username}`);
    setLeaveApprovals(Object.entries(leave.data));
    setTimeApprovals(Object.entries(time.data));
    console.log("Team :", team);
    console.log(leave.data);
    console.log(time.data)

  };

  const fetchTeam = async () => {
    const res = await axios.get(`https://backend-nv1r.onrender.com/api/manager/myTeam/${user.username}`);
    console.log(res);
    setTeam(res.data)
  };

  const approveLeave = async (id) => {
    console.log("Approve for ", id);

    await axios.put('https://backend-nv1r.onrender.com/api/manager/updateLeaveApproval', { attendanceId: id });
    fetchApprovals(); // Refresh data
  };

  const approveTime = async (id) => {
    await axios.put('https://backend-nv1r.onrender.com/api/manager/updatedtimeApproval', { attendanceId: id });
    fetchApprovals(); // Refresh data
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar2 />
      <div className="flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <section className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700">Team Members</h2>
            <ul className="list-disc ml-6 mt-2">
              {team.map(emp => (
                <li key={emp._id} className="text-gray-600">{emp.name} - {emp.email}</li>
              ))}
            </ul>
          </section>

          <section className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700">Pending Leave Approvals</h2>
            {leaveApprovals.length === 0 ? (
              <p className="text-gray-500">No pending leave approvals.</p>
            ) : (
              leaveApprovals.map(([user, leaves], index) => (
                <div key={index} className="mt-4">
                  <h3 className="font-bold text-gray-800">{user}</h3>
                  {leaves.map(leave => (
                    <div key={leave._id} className="border border-gray-300 p-2 my-2 rounded">
                      <p className="text-gray-600">From: {new Date(leave.startDate).toDateString()}, To: {new Date(leave.endDate).toDateString()}</p>
                      <button onClick={() => approveLeave(leave._id)} className="btn btn-success mt-2">Approve</button>
                    </div>
                  ))}
                </div>
              ))
            )}
          </section>

          <section className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700">Pending Time Approvals</h2>
            {timeApprovals.length === 0 ? (
              <p className="text-gray-500">No pending time approvals.</p>
            ) : (
              timeApprovals.map(([name, times], index) => (
                <div key={index} className="mt-4">
                  <h3 className="font-bold text-gray-800">{name}</h3>
                  {times.map(att => (
                    <div key={att._id} className="border border-gray-300 p-2 my-2 rounded">
                      <p className="text-gray-600">Date: {new Date(att.date).toDateString()}</p>
                      <p className="text-gray-600">Total Hours: {att.totalHours}</p>
                      <button onClick={() => approveTime(att._id)} className="btn btn-success mt-2">Approve</button>
                    </div>
                  ))}
                </div>
                
              ))
            )}
            
          </section>
        </div>
        
      </div>
          <div className='justfy-center items-center flex flex-col gap-4'>
          <Link 
          to="/AdminDashboard/salaryDashboard"
          className="py-2 px-6 rounded-lg font-semibold shadow transition btn btn-primary text-white">
            Salary Dashboard
          </Link>
          <div className='justfy-center items-center flex flex-col gap-4'>
          <Link 
          to="/AdminDashboard/Performance"
          className="py-2 px-6 rounded-lg font-semibold shadow transition btn btn-primary text-white">
            Performance Dashboard
          </Link>
          </div>
          </div>
          
    </div>
    
  );

};

export default AdminDashboard
