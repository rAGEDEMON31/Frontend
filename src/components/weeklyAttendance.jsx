import React, { useState, useEffect } from 'react';
import { useUser } from "../context/UserContext";
import axios from 'axios';
import Navbar3 from '../components/Navbar3';
import { AuroraBackground } from '../components/ui/aurora-background';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

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

function formatDate(date) {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const WeeklyAttendance = () => {
  const [weekData, setWeekData] = useState({});
  const [weekStart, setWeekStart] = useState(getStartOfWeek(new Date()));
  const [savedDays, setSavedDays] = useState({});
  const { user } = useUser();

  useEffect(() => {
    const data = {};
    daysOfWeek.forEach(day => {
      data[day] = { checkedIn: '', checkedOut: '', date: '' };
    });

    axios.get(`https://backend-nv1r.onrender.com/api/employee/attendance/${user._id}/${weekStart}`)
      .then(response => {
        const attendanceData = response.data;
        if (attendanceData.length > 0) {
          attendanceData.forEach(entry => {
            const day = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
            if (data[day]) {
              data[day].checkedIn = entry.checkInTime ? new Date(entry.checkInTime).toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit' }) : '';
              data[day].checkedOut = entry.checkOutTime ? new Date(entry.checkOutTime).toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit' }) : '';
              data[day].date = entry.date;
              setSavedDays(prev => ({ ...prev, [day]: true }));
            }
          });
        }
      });

    setWeekData(data);
    setSavedDays({});
  }, [weekStart, user._id]);

  const handleTimeChange = (day, type, value, currDate) => {
    setWeekData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
        date: currDate.toISOString()
      }
    }))
  };

  const handleSaveDay = async (day, currDate) => {
    try {
      setSavedDays(prev => ({
        ...prev,
        [day]: true
      }));
      let dateTemp = new Date(currDate);
      await axios.post('https://backend-nv1r.onrender.com/api/employee/attendance', {
        employeeid: user._id,
        checkedIn: dateTemp.setHours(weekData[day].checkedIn.split(":")[0], weekData[day].checkedIn.split(":")[1], 0, 0),
        checkedOut: dateTemp.setHours(weekData[day].checkedOut.split(":")[0], weekData[day].checkedOut.split(":")[1], 0, 0),
        date: weekData[day].date
      });
    } catch (error) {
      console.log("error in saving attendance");
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      let numberOfDays = 0;
      const dates = [];
      if (Object.keys(savedDays).length !== 0) {
        for (const day of daysOfWeek) {
          if (savedDays[day]) {
            numberOfDays++;
            dates.push(weekData[day].date);
          }
        }
      }
      if (numberOfDays < 5) {
        return alert("Please fill all days before submitting");
      }
      await axios.put('https://backend-nv1r.onrender.com/api/employee/submit', {
        employeeid: user._id,
        date: weekStart
      });
    } catch (error) {
      console.log(error);
      return alert("Internal Server Error");
    }
  };

  const handlePrevWeek = () => {
    setWeekStart(prev => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setWeekStart(prev => addDays(prev, 7));
  };

  return (
    <AuroraBackground>
      <Navbar3 />
      <div className="p-6 pt-24 max-w-6xl mx-auto min-h-[80vh] flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 w-full">
          <div className="flex items-center justify-between mb-6">
            <button className="btn bg-blue-900 btn-outline text-white" onClick={handlePrevWeek}>Previous</button>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-800">
              Week of {formatDate(weekStart)}
            </h2>
            <button className="btn bg-blue-900 btn-outline text-white" onClick={handleNextWeek}>Next</button>
          </div>
          <div className="space-y-4">
            {daysOfWeek.map((day, idx) => {
              const date = addDays(weekStart, idx);
              const isSaved = savedDays[day];
              return (
                <div key={day} className="bg-white/90 shadow-md p-4 rounded-xl flex flex-col">
                  <h3 className="text-lg text-blue-900 font-semibold capitalize flex items-center gap-2">
                    {day}
                    <span className="text-gray-500 text-sm">({formatDate(date)})</span>
                  </h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2">
                    <div>
                      <label className="block text-sm text-blue-900 font-medium">Check-In</label>
                      <input
                        type="time"
                        value={weekData[day]?.checkedIn || ''}
                        onChange={(e) => handleTimeChange(day, 'checkedIn', e.target.value, date)}
                        className="input input-bordered w-full"
                        disabled={isSaved}
                      />
                    </div>
                    <div>
                      <label className="block text-blue-900 text-sm font-medium">Check-Out</label>
                      <input
                        type="time"
                        value={weekData[day]?.checkedOut || ''}
                        onChange={(e) => handleTimeChange(day, 'checkedOut', e.target.value, date)}
                        className="input input-bordered w-full"
                        disabled={isSaved}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      className={`btn bg-blue-600 hover:bg-blue-900 text-white ${isSaved ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleSaveDay(day, date)}
                      disabled={isSaved}
                    >
                      OK
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="bg-white/90 shadow-md rounded-xl p-8 h-fit md:w-1/3 w-full flex flex-col items-center">
          <h2 className="text-2xl text-blue-900 font-bold mb-4">Submit Attendance</h2>
          <p className="text-sm text-blue-800 mb-4 text-center">Ensure all days are filled before submitting.</p>
          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-lg py-2 transition"
          >
            Submit Week
          </button>
        </aside>
      </div>
    </AuroraBackground>
  );
};

export default WeeklyAttendance;
