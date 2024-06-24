import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        {/* Body */}
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        Made ❤️ by Rizon Kumar Rahi
      </div>
      {/* Footer */}
    </div>
  );
};

export default AppLayout;
