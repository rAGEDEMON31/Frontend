import React, { useState, useEffect } from 'react';
import { useUser } from "../context/UserContext";
import axios from 'axios';
import Navbar3 from '../components/Navbar3';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function getStartOfWeek(date) {
  // Monday as first day of week
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - ((day + 6) % 7); // Monday = 0
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
      data[day] = { checkedIn: '', checkedOut: '', date:'' };
    });
    console.log(weekStart);
    
    axios.get(`https://backend-nv1r.onrender.com/api/employee/attendance/${user._id}/${weekStart}`)
      .then(response => {
        const attendanceData = response.data;
        console.log(attendanceData);
        if (attendanceData.length > 0) {
          attendanceData.forEach(entry => {
            const day = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
            if (data[day]) {
              data[day].checkedIn = entry.checkInTime ? new Date(entry.checkInTime).toLocaleTimeString([], {hourCycle:'h23', hour: '2-digit', minute: '2-digit' }) : '';
              data[day].checkedOut = entry.checkOutTime ? new Date(entry.checkOutTime).toLocaleTimeString([], { hourCycle:'h23',hour: '2-digit', minute: '2-digit' }) : '';
              data[day].date = entry.date;
              setSavedDays(prev => ({ ...prev, [day]: true }));
            }
          });
        }
      });
   
    setWeekData(data);
    setSavedDays({});
    console.log(weekData, savedDays,weekStart);
     // Reset saved days when week changes
  }, [weekStart]);

  const handleTimeChange = (day, type, value,currDate) => {
    let dateTemp = new Date(currDate);
    let splitTIme = value.split(":");
    dateTemp.setHours(splitTIme[0], splitTIme[1], 0, 0);
    setWeekData(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
         date: currDate.toISOString()
      }
    }))
    
  };

  const handleSaveDay = async (day,currDate) => {
    try {
      console.log(day, weekData[day],savedDays, user);
      setSavedDays(prev => ({
        ...prev,
        [day]: true
      }));
      let dateTemp = new Date(currDate);
      console.log(`Saving ${day}:`, savedDays);
      await axios.post('https://backend-nv1r.onrender.com/api/employee/attendance',{
      employeeid: user._id,
      checkedIn: dateTemp.setHours(weekData[day].checkedIn.split(":")[0], weekData[day].checkedIn.split(":")[1], 0, 0),
      checkedOut: dateTemp.setHours(weekData[day].checkedOut.split(":")[0], weekData[day].checkedOut.split(":")[1], 0, 0),
      date:weekData[day].date
    });
    } catch (error) {
      console.log("error in saving attendance");
      console.error(error);
    }
    
  };

  const handleSubmit = async () => {
  try {
    let numberOfDays = 0;
    const dates =[];
    if (Object.keys(savedDays).length!== 0)  {
      for (const day of daysOfWeek) {
        if (savedDays[day]) {
          numberOfDays++;
          dates.push(weekData[day].date);
        }
      }
    }
    console.log("Number of days saved:", numberOfDays, dates);
    if (numberOfDays < 5) {
      return alert("Please fill all days before submitting"); 
    }
    // Submit the week data
    console.log("Submitting week data:", weekData, weekStart);
    await axios.put('https://backend-nv1r.onrender.com/api/employee/submit',{
      employeeid: user._id,
      date:weekStart
    });

  } catch (error) {
    console.log(error);
    return alert("Internal Server Error"); 
    
    // res.sendStatus(500).json({ message: "Internal Server Error" });
  }
    // Add your API call here to submit `weekData` and `weekStart`
  };

  const handlePrevWeek = () => {
    setWeekStart(prev => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setWeekStart(prev => addDays(prev, 7));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-white">
      <Navbar3 />
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <button className="btn bg-blue-900 btn-outline" onClick={handlePrevWeek}>Previous</button>
            <h2 className="text-2xl font-bold text-black">
              Week of {formatDate(weekStart)}
            </h2>
            <button className="btn bg-blue-900 btn-outline" onClick={handleNextWeek}>Next</button>
          </div>
          <div className="space-y-4">
            {daysOfWeek.map((day, idx) => {
              const date = addDays(weekStart, idx);
              const isSaved = savedDays[day];
              return (
                <div key={day} className="bg-white shadow-md p-4 rounded-xl flex flex-col">
                  <h3 className="text-lg text-black font-semibold capitalize flex items-center gap-2">
                    {day}
                    <span className="text-black text-sm">({formatDate(date)})</span>
                  </h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2">
                    <div>
                      <label className="block text-sm text-black font-medium">Check-In</label>
                      <input
                        type="time"
                        value={weekData[day]?.checkedIn || ''}
                        onChange={(e) => handleTimeChange(day, 'checkedIn', e.target.value, date)}
                        className="input input-bordered w-full"
                        disabled={isSaved}
                      />
                    </div>
                    <div>
                      <label className="block text-black text-sm font-medium">Check-Out</label>
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

        <aside className="bg-gray-100 shadow-md rounded-xl p-6 h-fit">
          <h2 className="text-xl text-black font-bold mb-4">Submit Attendance</h2>
          <p className="text-sm text-black mb-2">Ensure all days are filled before submitting.</p>
          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full"
          >
            Submit Week
          </button>
        </aside>
      </div>
    </div>
  );
};

export default WeeklyAttendance;
