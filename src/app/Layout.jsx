import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar"; 
import 'remixicon/fonts/remixicon.css';
import Header from "../components/Header";

export default function Layout() {
  const { logout } = useAuth();
  
  // State to manage the mobile sidebar toggle
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    // The outermost wrapper takes full screen height and prevents page-level scrolling
    <div className="flex h-screen w-full bg-slate-50 font-sans overflow-hidden">
      
      {/* 1. SIDEBAR */}
      {/* Pass the state and updater function to the Sidebar */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        setIsMobileOpen={setIsMobileSidebarOpen} 
      />

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#f3f4f9]">
        
       {/* Pass the function to open the sidebar to the Header */}
       <Header 
         onLogout={logout} 
         onMenuClick={() => setIsMobileSidebarOpen(true)} 
       />

        {/* 3. DYNAMIC PAGE CONTENT (Outlet) */}
        {/* This is the only area that scrolls */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-10 relative">
          {/* Background decorative element (optional, adds depth) */}
          <div className="absolute top-0 left-0 w-full h-64 bg-white/50 -z-10 pointer-events-none rounded-b-3xl"></div>
          
          <Outlet />
        </main>

      </div>
    </div>
  );
}