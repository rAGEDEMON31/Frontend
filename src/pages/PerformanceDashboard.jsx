import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar3 from '../components/Navbar3';
import { useUser } from '../context/UserContext';
import { AuroraBackground } from '../components/ui/aurora-background';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - ((day + 6) % 7);
  return new Date(d.setDate(diff));
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatTime(timeStr) {
  if (!timeStr) return '-';
  const [h, m] = timeStr.split(':');
  return `${h}:${m}`;
}

const PerformanceDashboard = () => {
  const { user } = useUser();
  const [weekStart, setWeekStart] = useState(getStartOfWeek(new Date()));
  const [attendance, setAttendance] = useState([]);
  const [lop, setLop] = useState(0);

  useEffect(() => {
    // Fetch weekly attendance
    axios
      .get(`https://backend-nv1r.onrender.com/api/employee/attendance/${user._id}/${weekStart}`)
      .then(res => setAttendance(res.data || []));
    // Fetch LOP from salary/team data
    axios
      .get(`https://backend-nv1r.onrender.com/api/manager/myTeam/${user.username}`)
      .then(res => {
        const me = res.data.find(emp => emp._id === user._id);
        setLop(me?.lop || 0);
      });
  }, [user, weekStart]);

  // Calculate metrics
  const presentDays = attendance.filter(a => a.checkInTime).length;
  const avgCheckIn =
    attendance.length
      ? (
          attendance
            .filter(a => a.checkInTime)
            .reduce((acc, a) => acc + new Date(a.checkInTime).getHours() * 60 + new Date(a.checkInTime).getMinutes(), 0) /
          presentDays
        )
      : null;
  const avgCheckOut =
    attendance.length
      ? (
          attendance
            .filter(a => a.checkOutTime)
            .reduce((acc, a) => acc + new Date(a.checkOutTime).getHours() * 60 + new Date(a.checkOutTime).getMinutes(), 0) /
          presentDays
        )
      : null;

  function minsToTime(mins) {
    if (!mins || isNaN(mins)) return '-';
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  return (
    <AuroraBackground>
      <Navbar3 />
      <div className="p-8 max-w-5xl mx-auto space-y-8 pt-20">
        <h1 className="text-3xl font-extrabold text-blue-800 text-center mb-6 tracking-tight">
          Performance Dashboard
        </h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <p className="text-sm text-blue-700 font-medium mb-1">Attendance Rate</p>
            <p className="text-2xl font-bold text-blue-900">{presentDays}/7</p>
          </div>
          <div className="bg-green-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <p className="text-sm text-green-700 font-medium mb-1">Avg Check-In</p>
            <p className="text-2xl font-bold text-green-900">{minsToTime(avgCheckIn)}</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <p className="text-sm text-yellow-700 font-medium mb-1">Avg Check-Out</p>
            <p className="text-2xl font-bold text-yellow-900">{minsToTime(avgCheckOut)}</p>
          </div>
          <div className="bg-red-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <p className="text-sm text-red-700 font-medium mb-1">Total LOP Days</p>
            <p className="text-2xl font-bold text-red-900">{lop}</p>
          </div>
        </div>

        {/* Weekly Attendance Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-8">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Day</th>
                <th className="text-left p-4 font-semibold text-gray-700">Date</th>
                <th className="text-left p-4 font-semibold text-gray-700">Check-In</th>
                <th className="text-left p-4 font-semibold text-gray-700">Check-Out</th>
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map((day, idx) => {
                const date = addDays(weekStart, idx);
                const entry = attendance.find(a =>
                  new Date(a.date).toDateString() === date.toDateString()
                );
                return (
                  <tr key={day} className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="p-4">{day}</td>
                    <td className="p-4">{date.toLocaleDateString()}</td>
                    <td className="p-4">{entry?.checkInTime ? formatTime(new Date(entry.checkInTime).toTimeString().slice(0,5)) : '-'}</td>
                    <td className="p-4">{entry?.checkOutTime ? formatTime(new Date(entry.checkOutTime).toTimeString().slice(0,5)) : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default PerformanceDashboard;