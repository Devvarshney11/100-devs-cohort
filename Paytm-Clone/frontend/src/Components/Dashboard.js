import React from "react";
import Navbar from "./Navbar";
import Balance from "./Balance";
import Users from "./Users";

const Dashboard = () => {
  return (
    <div className="bg-slate-600 h-screen">
      <Navbar />
      <Balance />
      <Users />
    </div>
  );
};

export default Dashboard;
