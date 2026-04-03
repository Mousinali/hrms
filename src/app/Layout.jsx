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
    /* 1. Main Wrapper: 
      - Use h-[100dvh] (Dynamic Viewport Height) for iPhone Safari compatibility.
      - overflow-hidden is CRITICAL here to prevent the body from scrolling.
    */
    <div className="flex h-svh w-full bg-slate-50 overflow-hidden select-none">
      
      {/* SIDEBAR */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        setIsMobileOpen={setIsMobileSidebarOpen} 
      />

      {/* 2. MAIN CONTENT WRAPPER: 
        - flex-col ensures Header stays at top and Main takes the rest.
        - h-full and overflow-hidden ensures this container NEVER scrolls.
      */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#f3f4f9]">
        
        <Header 
          onLogout={logout} 
          onMenuClick={() => setIsMobileSidebarOpen(true)} 
        />

        {/* 3. SCROLLABLE AREA: 
          - flex-1 tells it to take up all remaining height.
          - overflow-y-auto makes THIS the only scrollable area.
          - touch-auto ensures smooth scrolling on iPhone.
        */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-10 relative custom-scrollbar touch-auto overscroll-contain">
          
          {/* Background decorative element */}
          <div className="absolute top-0 left-0 w-full h-64 bg-white/50 -z-10 pointer-events-none rounded-b-[3rem]"></div>
          
          {/* Wrapping Outlet in a div ensures the padding-bottom 
             accounts for the iPhone home bar.
          */}
          <div className="pb-10">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}