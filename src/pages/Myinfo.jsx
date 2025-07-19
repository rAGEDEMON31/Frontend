import React from "react";
import { useUser } from "../context/UserContext";
import Navbar3 from "../components/Navbar3";
import { AuroraBackground } from "../components/ui/aurora-background";

const Myinfo = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <AuroraBackground>
        <Navbar3 />
        <div className="flex items-center justify-center min-h-screen pt-20 px-2">
          <div className="bg-[#181c2f]/90 backdrop-blur-xl rounded-2xl shadow-2xl px-4 py-8 sm:px-8 sm:py-10 max-w-md w-full text-center border border-blue-900/10">
            <p className="text-lg text-gray-200">User not found. Please log in.</p>
          </div>
        </div>
      </AuroraBackground>
    );
  }

  return (
    <AuroraBackground>
      <Navbar3 />
      <div className="flex items-center justify-center min-h-screen pt-20 px-2">
        <div className="bg-[#181c2f]/90 backdrop-blur-xl rounded-2xl shadow-2xl px-4 py-8 sm:px-8 sm:py-10 max-w-md w-full border border-blue-900/10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-800 mb-6 text-center drop-shadow-lg">
            My Information
          </h2>
          <div className="space-y-4 text-base">
            <div className="flex flex-col sm:flex-row justify-between text-gray-200">
              <span className="font-semibold">Name:</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between text-gray-200">
              <span className="font-semibold">Username:</span>
              <span>{user?.username}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between text-gray-200">
              <span className="font-semibold">Email:</span>
              <span className="break-all">{user?.email}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between text-gray-200">
              <span className="font-semibold">Role:</span>
              <span>{Array.isArray(user?.roles) ? user.roles.join(", ") : user?.roles || "N/A"}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between text-gray-200">
              <span className="font-semibold">ID:</span>
              <span className="break-all">{user?._id}</span>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Myinfo;
