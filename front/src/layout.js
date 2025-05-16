import React from 'react';
import Sidebar from './Components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;