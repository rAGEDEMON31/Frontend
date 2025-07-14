import React from 'react'
import { Routes, Route } from 'react-router'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Myinfo from './pages/Myinfo'
import AdminDashboard from './pages/AdminDashboard'
import { UserProvider } from './context/UserContext'
import WeeklyAttendance from './components/weeklyAttendance'
import Leaves from './components/Leaves'
import 'react-calendar/dist/Calendar.css';
import SalaryDashboard from './pages/SalaryDashboard'
import PerformanceDashboard from './pages/PerformanceDashboard'

const App = () => {
  return (
    <div data-theme="sunset">
      {/* <button className="btn btn-neutral">Neutral</button>
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-accent">Accent</button>
<button className="btn btn-info">Info</button>
<button className="btn btn-success">Success</button>
<button className="btn btn-warning">Warning</button>
<button className="btn btn-error">Error</button> */}
      <UserProvider>
        <Routes>
          {/* <Route path="" element={</>}/> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/Myinfo' element={<Myinfo />} />
          <Route path='/AdminDashboard' element={<AdminDashboard />}/>
          <Route path='/weekly' element={<WeeklyAttendance/>}/>
          <Route path='/leaves' element={<Leaves/>}/>
          <Route path="/AdminDashboard/salaryDashboard" element={<SalaryDashboard/>}/>
          <Route path='AdminDashboard/Performance' element={<PerformanceDashboard/>}/>
          {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
        </Routes>
      </UserProvider> 


    </div>
  )
}

export default App
