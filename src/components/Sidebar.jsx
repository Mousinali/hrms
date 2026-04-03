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
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileOpen(false)}
      ></div>

      {/* Main Sidebar Container */}
      <aside 
        className={`fixed md:sticky top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out font-sans shrink-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
        ${isCollapsed ? "md:w-20" : "md:w-72"} w-72`}
      >
        
        {/* --- Header: Logo & Toggle --- */}
        <div className={`flex items-center h-16 mb-2 border-b border-slate-100 shrink-0 transition-all duration-300 ${
          isCollapsed ? "md:justify-center md:px-0" : "justify-between px-4 md:px-5"
        }`}>
          
          {/* Brand Logo & Name (Hidden completely on desktop when collapsed to avoid overlap) */}
          <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? "md:hidden" : "flex"}`}>
            <div className="bg-indigo-600 text-white rounded-lg shrink-0 flex items-center justify-center w-8 h-8 shadow-sm">
              <i className="ri-donut-chart-fill text-xl"></i>
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight whitespace-nowrap">
              HRMS
            </span>
          </div>

          {/* Desktop Toggle Button */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none shrink-0"
          >
            <i className={`text-xl transition-transform duration-300 ${isCollapsed ? "ri-menu-unfold-line" : "ri-menu-fold-line"}`}></i>
          </button>
          
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-lg transition-colors focus:outline-none shrink-0"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* --- Navigation Links --- */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar px-3 py-2 space-y-1">
          {menuItems.map((item, index) => {
            
            // Section Headers (MENU, USER)
            if (item.section) {
              return (
                <div 
                  key={index} 
                  className={`pt-5 pb-2 text-[11px] font-bold text-slate-400 tracking-wider transition-all duration-300 flex items-center ${
                    isCollapsed ? "md:justify-center md:px-0" : "px-3"
                  }`}
                >
                  {/* Shows a perfectly centered dot when collapsed, otherwise shows text */}
                  {isCollapsed ? (
                     <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300"></span> 
                  ) : (
                    <span className="whitespace-nowrap">{item.section}</span>
                  )}
                  <span className="md:hidden whitespace-nowrap">{item.section}</span>
                </div>
              );
            }

            // Clickable Links
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  if (window.innerWidth < 768) setIsMobileOpen(false); 
                }}
                className={`w-full flex items-center rounded-xl transition-all group relative font-medium text-[15px] ${
                  /* Drop the gap and horizontal padding to center the icon when collapsed */
                  isCollapsed ? "md:justify-center md:p-3 md:gap-0" : "px-3 py-2.5 gap-3"
                } ${
                  isActive 
                    ? "bg-slate-50 text-slate-900" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {/* Icon */}
                <i className={`${item.icon} text-[1.25rem] shrink-0 transition-colors ${
                  isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                }`}></i>
                
                {/* Text (Completely hidden from DOM on desktop collapse to prevent pushing) */}
                <span className={`whitespace-nowrap text-left transition-opacity duration-300 ${
                  isCollapsed ? "md:hidden" : "block"
                }`}>
                  {item.title}
                </span>

                {/* Floating Tooltip for Desktop Collapsed State */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 hidden md:block shadow-lg">
                    {item.title}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* --- Footer: User Profile --- */}
        <div className="p-4 mt-auto border-t border-slate-100 shrink-0">
          <button className={`w-full flex items-center rounded-xl hover:bg-slate-50 transition-all focus:outline-none group ${
            /* Strictly center the avatar without gaps when collapsed */
            isCollapsed ? "md:justify-center md:p-2 md:gap-0" : "gap-3 p-1.5"
          }`}>
            
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-transparent group-hover:ring-purple-200 transition-all">
               <span className="text-xl leading-none">🧑🏻‍💻</span>
            </div>

            {/* Name/Handle (Hidden on collapse) */}
            <div className={`flex flex-col items-start text-left flex-1 min-w-0 transition-opacity duration-300 ${
              isCollapsed ? "md:hidden" : "block"
            }`}>
              <span className="text-sm font-bold text-slate-800 w-full truncate">Ronald Richards</span>
              <span className="text-xs font-medium text-slate-500 w-full truncate">@ronaldrich</span>
            </div>

            {/* Chevron Icon (Hidden on collapse) */}
            <i className={`ri-arrow-right-s-line text-slate-400 group-hover:text-slate-700 transition-colors shrink-0 ${
              isCollapsed ? "md:hidden" : "block"
            }`}></i>
          </button>
        </div>

      </aside>
    </>
  );
}