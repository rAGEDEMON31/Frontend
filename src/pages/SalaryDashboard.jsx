import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar3 from '../components/Navbar3';
import { useUser } from '../context/UserContext';

const SalaryDashboard = () => {
  const [teamData, setTeamData] = useState([]);
  const { user } = useUser(); // Ensure this is properly set on login

  useEffect(() => {
    const fetchData = async () => {
      try {const res = await axios.get(`https://backend-nv1r.onrender.com/api/manager/myTeam/${user.username}`);

    console.log(res);
    setTeamData(res.data)
  }catch (error) {
        console.error("Error fetching team data:", error);}
    }
    fetchData(); 
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-white">
      <Navbar3 />
      <div className="p-8 max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-extrabold text-blue-800 text-center mb-6 tracking-tight">
          Salary Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <p className="text-sm text-blue-700 font-medium mb-1">Total Team CTC</p>
            <p className="text-2xl font-bold text-blue-900">
              ₹{teamData.reduce((acc, emp) => acc + emp.ctc, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-green-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <p className="text-sm text-green-700 font-medium mb-1">Avg In-Hand Salary</p>
            <p className="text-2xl font-bold text-green-900">
              ₹
              {teamData.length
                ? (
                    teamData.reduce((acc, emp) => acc + emp.inHand, 0) /
                    teamData.length
                  ).toFixed(0)
                : 0}
            </p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <p className="text-sm text-yellow-700 font-medium mb-1">Total LOP Days</p>
            <p className="text-2xl font-bold text-yellow-900">
              {teamData.reduce((acc, emp) => acc + emp.lop, 0)}
            </p>
          </div>
        </div>

        {/* Team Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-8">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Name</th>
                <th className="text-left p-4 font-semibold text-gray-700">Role</th>
                <th className="text-right p-4 font-semibold text-gray-700">CTC (₹)</th>
                <th className="text-right p-4 font-semibold text-gray-700">In-hand (₹)</th>
                <th className="text-right p-4 font-semibold text-gray-700">LOP</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((emp, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="p-4">{emp.name}</td>
                  <td className="p-4">{emp.roles[0]}</td>
                  <td className="p-4 text-right">{emp.salary}</td>
                  <td className="p-4 text-right">{emp.inHand}</td>
                  <td className="p-4 text-right">{emp.lop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalaryDashboard;
