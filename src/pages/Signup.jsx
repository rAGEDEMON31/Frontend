import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Signup = () => {
  const [newUser, setNewUser] = useState({name:"",age:"",email:"",gender:"",username:"", password:""});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);
    
    let roles =["user"]
    if(formValues.role!=="user"){
      roles.pop()
      roles.push(formValues.role)
    }
    setNewUser({
      name:formValues.fullName,
      age:formValues.age,
      email:formValues.email,
      gender:formValues.gender,
      manager:formValues.manager,
      username:formValues.username,
      password:formValues.password,
      roles:roles
    })
    console.log(newUser);
    try {
      await axios.post("https://backend-nv1r.onrender.com/api/employee/addNewEmployee",newUser);
      toast.success("Employee Registered successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Error creating user")
      console.log(error);
      
    }
  };
  return (
    <div className='flex min-h-full flex-col justify-center px-3 py-6 lg:px-4'>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Employee Registration</h2>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-base-100">
  <form className="w-full max-w-lg mt-5" onSubmit={handleSubmit}>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
      <legend className="fieldset-legend">Employee details</legend>

      <label className="label">Name</label>
      <input type="text" className="input input-bordered w-full" name="fullName" placeholder="Full Name" />

      <label className="label">Age</label>
      <input type="number" className="input input-bordered w-full" name="age" placeholder="Age" />

      <label className="label">Email</label>
      <input type="email" className="input input-bordered w-full" name="email" placeholder="Email" />

      <label className="label">Gender</label>
      <select className="select select-bordered w-full" name="gender" defaultValue="">
  <option value="" disabled>Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
<div className='flex justify-start items-center'>
      <label className="label">are you a Manager?</label>
      
       <label className='label'>Yes</label>
       <input type="radio" name="role" className='radio' value="manager" />
       
      
      <label className='label'>NO</label>
      <input type="radio" name="role" className="radio" value="user" defaultChecked  />
      </div>
      <label className="label">Manager</label>
      <input type="text" className="input input-bordered w-full" name="manager" placeholder="Name" />

      <label className="label">Username</label>
      <input type="text" className="input input-bordered w-full" name="username" placeholder="Username" />

      <label className="label">Password</label>
      <input type="password" className="input input-bordered w-full" name="password" placeholder="Password" />

      <button className="btn btn-neutral mt-4 w-full" type="submit">Submit</button>
    </fieldset>
  </form>
</div>
</div>
  )
}

export default Signup
