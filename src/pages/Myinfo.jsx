import React from "react";
import { useUser } from "../context/UserContext"; // ✅ Make sure path is correct
import Navbar3 from "../components/Navbar3"; // ✅ Optional, use your navbar

const Myinfo = () => {
  const { user } = useUser();
  console.log("User object:", user);
  
  if (!user) {
    return <p className="text-center mt-10">User not found. Please log in.</p>;
  }

  return (
    <div className="min-h-screen">
      <Navbar3 />
      <div className="max-w-xl mx-auto mt-10 bg-base-300 p-6 rounded-lg shadow-md">

        <h2 className="text-2xl font-bold mb-4 text-center">My Information</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.roles||"N/A"}</p>
        <p><strong>ID:</strong> {user?._id}</p>
      </div>
    </div>
  );
};

export default Myinfo;
