import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { AuroraBackground } from '../components/ui/aurora-background';

const Leaves = () => {
    const [date, setDates] = useState(new Date());
    const {user,setUser} = useUser();

    useEffect(()=>{
        //leaves taken
    },[])
    const getLengthOfLeave = () => {
        if (date.length > 0) {
            return moment(date[1]).diff(moment(date[0]), 'days') + 1;
        }
    }

    const submitLeaves=async()=>{
        console.log(date);
        await axios.post("https://backend-nv1r.onrender.com/api/employee/editLeaves",
            {empId:user._id, 
            startDate:date[0],
            endDate:date[1]}).then(async()=>{
                setDates([]);
                const updatedUser = await axios.get(`https://backend-nv1r.onrender.com/api/employee/getEmployee/${user.username}`)
                setUser(updatedUser);
            })
        
    }

    return (
        <AuroraBackground>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 text-black">
                    <Calendar onChange={setDates} value={date} selectRange={true} />
                    {date.length === 2 ? (
                        <div className="w-full bg-blue-50 rounded-lg p-4 text-center shadow">
                            <p className="mb-2">
                                <span className="font-semibold text-blue-700">Start:</span>{' '}
                                {date[0].toDateString()}
                                &nbsp;|&nbsp;
                                <span className="font-semibold text-blue-700">End:</span> {date[1].toDateString()}
                            </p>
                            <p className="text-blue-600 font-medium">Leaves for {getLengthOfLeave()} days</p>
                        </div>
                    ) : (
                        <p className="w-full bg-blue-50 rounded-lg  text-black p-4 text-center shadow">
                            <span className="font-semibold text-blue-700">Default selected date:</span>{' '}
                            {date.toDateString()}
                        </p>
                    )}
                    <p className="w-full bg-green-50 rounded-lg p-3 text-center font-semibold text-green-700 shadow">
                        Leave Balance {user.leaveBalance}
                    </p>
                    <button
                        type="submit"
                        className="mt-2 w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-sky-400 text-white font-bold rounded-lg shadow hover:from-sky-400 hover:to-blue-600 transition"
                        onClick={submitLeaves} 
                    >
                        Submit
                    </button>
                </div>
            </div>
        </AuroraBackground>
    );
}
export default Leaves