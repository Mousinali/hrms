import React, { useState } from "react";

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { section: "MENU" },
    { title: "Dashboard", icon: "ri-home-5-line", id: "Dashboard" },
    { title: "Employees", icon: "ri-user-3-line", id: "Employees" },
    { title: "Attendances", icon: "ri-checkbox-circle-line", id: "Attendances" },
    { title: "Calendar", icon: "ri-calendar-line", id: "Calendar" },
    { title: "Leaves", icon: "ri-logout-box-r-line", id: "Leaves" },
    { title: "Payroll", icon: "ri-stack-line", id: "Payroll" },
    { title: "Documents", icon: "ri-folder-2-line", id: "Documents" },
    { section: "USER" },
    { title: "Apps & Integration", icon: "ri-apps-2-line", id: "Apps" },
    { title: "Settings", icon: "ri-settings-3-line", id: "Settings" },
    { title: "Help & Support", icon: "ri-customer-service-2-line", id: "Help" },
  ];

  return (
    <>
      {/* Mobile Overlay - Optimized transition */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-all duration-300 ${
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileOpen(false)}
      ></div>

      {/* Main Sidebar Container */}
      <aside 
        className={`fixed md:sticky top-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out shrink-0
        /* iPhone Optimization: Use dynamic viewport height and safe area top */
        h-[100dvh] pt-[env(safe-area-inset-top)]
        ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0"} 
        ${isCollapsed ? "md:w-20" : "md:w-72"}`}
      >
        
        {/* --- Header: Logo & Toggle --- */}
        <div className={`flex items-center h-16 border-b border-slate-100 shrink-0 ${
          isCollapsed ? "md:justify-center" : "justify-between px-5"
        }`}>
          <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? "md:hidden" : "flex"}`}>
            <div className="bg-indigo-600 text-white rounded-lg shrink-0 flex items-center justify-center w-8 h-8">
              <i className="ri-donut-chart-fill text-xl"></i>
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">HRMS</span>
          </div>

          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <i className={`text-xl ${isCollapsed ? "ri-menu-unfold-line" : "ri-menu-fold-line"}`}></i>
          </button>
          
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden text-slate-400 p-2"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* --- Navigation Links: Optimized Scrolling --- */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-1 overscroll-contain
          /* Hide scrollbar for cleaner look on mobile but allow scrolling */
          scrollbar-hide [@supports(scrollbar-width:none)]:scrollbar-none [&::-webkit-scrollbar]:hidden">
          {menuItems.map((item, index) => {
            if (item.section) {
              return (
                <div key={index} className={`pt-4 pb-2 text-[10px] font-bold text-slate-400 tracking-widest ${
                  isCollapsed ? "md:text-center" : "px-3"
                }`}>
                  {isCollapsed ? "•••" : item.section}
                </div>
              );
            }

            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  if (window.innerWidth < 768) setIsMobileOpen(false); 
                }}
                className={`w-full flex items-center rounded-xl transition-all group relative py-2.5 ${
                  isCollapsed ? "md:justify-center px-0" : "px-3 gap-3"
                } ${isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50"}`}
              >
                <i className={`${item.icon} text-[1.25rem] shrink-0`}></i>
                <span className={`text-sm font-semibold whitespace-nowrap transition-opacity ${
                  isCollapsed ? "md:hidden" : "block"
                }`}>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* --- Footer: User Profile Optimized for iPhone Home Bar --- */}
        <div className="p-4 border-t border-slate-100 shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <button className={`w-full flex items-center rounded-xl p-1.5 hover:bg-slate-50 transition-all ${
            isCollapsed ? "md:justify-center" : "gap-3"
          }`}>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
               <span className="text-xl">🧑🏻‍💻</span>
            </div>
            <div className={`flex flex-col items-start text-left flex-1 min-w-0 ${isCollapsed ? "md:hidden" : "block"}`}>
              <span className="text-sm font-bold text-slate-800 truncate w-full">Ronald Richards</span>
              <span className="text-[10px] font-medium text-slate-400 truncate w-full">@ronaldrich</span>
            </div>
          </button>
        </div>

      </aside>
    </>
  );
}