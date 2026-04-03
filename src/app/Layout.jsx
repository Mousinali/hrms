import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar"; 
import 'remixicon/fonts/remixicon.css';
import Header from "../components/Header";

export default function Layout() {
  const { logout } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-svh w-full bg-slate-50 overflow-hidden select-none">
      
      {/* SIDEBAR */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        setIsMobileOpen={setIsMobileSidebarOpen} 
      />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#f3f4f9] ">
        
        <Header 
          onLogout={logout} 
          onMenuClick={() => setIsMobileSidebarOpen(true)} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-0  md:p-6 lg:p-10 relative custom-scrollbar touch-auto overscroll-contain">
          
          {/* Background decorative element */}
          <div className="absolute top-0 left-0 w-full h-64 bg-white/50 -z-10 pointer-events-none rounded-b-[3rem]"></div>
          
          <div className="pb-10">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}