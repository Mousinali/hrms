import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

// 1. Accept the onMenuClick prop here
const Header = ({ onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [shortcutKey, setShortcutKey] = useState("Ctrl");
  const searchInputRef = useRef(null);
  
  const { user, logout } = useAuth(); 

  // Detect OS for the keyboard hint and handle the Cmd/Ctrl + K shortcut
  useEffect(() => {
    const isMac = navigator.userAgent.toLowerCase().includes('mac');
    setShortcutKey(isMac ? "⌘" : "Ctrl");

    const handleKeyDown = (e) => {
      // Search Shortcut
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Close dropdowns on Escape
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  // Toggle handlers to ensure only one dropdown is open at a time
  const toggleProfile = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isNotifOpen) setIsNotifOpen(false);
  };

  const toggleNotif = () => {
    setIsNotifOpen(!isNotifOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const displayName = user ? user.charAt(0).toUpperCase() + user.slice(1) : "User";
  const avatarLetter = user ? user.charAt(0).toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        
        {/* Left Section: Mobile Toggle & Search */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1">
          
          {/* Mobile menu button */}
          <button 
            onClick={onMenuClick} // 2. Attach the prop to the onClick event here!
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            aria-label="Open sidebar"
          >
            <i className="ri-menu-4-line text-xl"></i>
          </button>

          {/* Global Search Bar */}
          <div className="hidden md:flex items-center max-w-md w-full">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <i className="ri-search-line text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300 text-lg"></i>
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search anything..."
                className="block w-full pl-10 pr-14 py-2 bg-slate-100/60 border-transparent rounded-xl leading-5 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 hover:bg-slate-100 transition-all duration-300 sm:text-sm shadow-sm focus:shadow-md"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <kbd className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-sans font-semibold text-slate-400 bg-white border border-slate-200 shadow-sm transition-opacity group-focus-within:opacity-0">
                  {shortcutKey} K
                </kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3 justify-end">
          
          {/* Mobile Search Icon */}
          <button 
            onClick={() => searchInputRef.current?.focus()}
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-all active:scale-95 focus:outline-none"
          >
            <i className="ri-search-line text-xl"></i>
          </button>

          {/* Settings / Help Icons (Desktop only) */}
          <div className="hidden lg:flex items-center gap-1 text-slate-500">
            <button className="p-2 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-all active:scale-95">
              <i className="ri-question-line text-xl"></i>
            </button>
            <button className="p-2 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-all active:scale-95">
              <i className="ri-settings-3-line text-xl"></i>
            </button>
          </div>

          {/* Notification Area */}
          <div className="relative">
            <button 
              onClick={toggleNotif}
              className="relative p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-all active:scale-95 focus:outline-none"
            >
              <i className="ri-notification-3-line text-xl"></i>
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 ring-2 ring-white"></span>
              </span>
            </button>

            {/* Notification Dropdown */}
            {isNotifOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsNotifOpen(false)}></div>
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-200/60 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200 overflow-hidden z-40">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/60 bg-slate-50/50">
                    <span className="text-sm font-bold text-slate-800">Notifications</span>
                    <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">Mark all read</button>
                  </div>

                  {/* List */}
                  <div className="max-h-[320px] overflow-y-auto p-2 space-y-1">
                    
                    {/* Item 1 */}
                    <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                      <div className="flex gap-3 items-start">
                        <div className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-indigo-50 text-indigo-600">
                          <i className="ri-mail-send-line text-[1.1rem]"></i>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">New leave request</p>
                          <p className="text-xs font-medium text-slate-500 mt-0.5 line-clamp-1">John Doe has requested sick leave for tomorrow.</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">2 mins ago</p>
                        </div>
                      </div>
                    </button>

                    {/* Item 2 */}
                    <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                      <div className="flex gap-3 items-start">
                        <div className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-emerald-50 text-emerald-600">
                          <i className="ri-check-double-line text-[1.1rem]"></i>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">Payroll processed</p>
                          <p className="text-xs font-medium text-slate-500 mt-0.5 line-clamp-1">March 2026 payroll has been successfully processed.</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">1 hour ago</p>
                        </div>
                      </div>
                    </button>

                  </div>
                  
                  {/* Footer */}
                  <div className="border-t border-slate-200/60 p-2">
                    <button className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors text-center">
                      View all notifications
                    </button>
                  </div>

                </div>
              </>
            )}
          </div>

          {/* Elegant Divider */}
          <div className="hidden sm:block h-6 w-px bg-slate-200/80 mx-2"></div>

          {/* User Profile Area */}
          <div className="relative">
            <button 
              onClick={toggleProfile}
              className="flex items-center gap-2.5 focus:outline-none group p-1 pr-2 rounded-full hover:bg-slate-100/80 transition-all duration-300 active:scale-95"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-transparent group-hover:ring-indigo-100 transition-all">
                {avatarLetter}
              </div>
              
              <div className="hidden md:flex flex-col items-start pr-1">
                <span className="text-sm font-semibold text-slate-700 leading-none group-hover:text-indigo-600 transition-colors">
                  {displayName}
                </span>
                <span className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Super Admin</span>
              </div>

              <i className={`ri-arrow-down-s-line text-slate-400 hidden sm:block text-lg transition-transform duration-300 ${isDropdownOpen ? '-rotate-180 text-indigo-500' : ''}`}></i>
            </button>

            {/* Profile Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)}></div>
                
                <div className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-200/60 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200 overflow-hidden z-40">
                  
                  {/* Identity Header with Gradient & Status */}
                  <div className="p-4 bg-gradient-to-br from-slate-50/80 to-slate-100/50 border-b border-slate-200/60 relative">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                          {avatarLetter}
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                      </div>
                      
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-slate-900 leading-tight">{displayName}</p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5 truncate max-w-[160px]">admin@turaingrp.com</p>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-indigo-50 border border-indigo-100 text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 shadow-sm">
                        Admin
                      </span>
                    </div>
                  </div>
                  
                  {/* Main Actions */}
                  <div className="p-2 space-y-1">
                    <a href="#profile" className="flex items-start gap-3 px-3 py-2.5 w-full text-left rounded-xl group hover:bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                      <div className="flex items-center justify-center shrink-0 w-9 h-9 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-sm border border-transparent group-hover:border-slate-200/60 transition-all duration-200">
                        <i className="ri-user-settings-line text-[1.15rem]"></i>
                      </div>
                      <div className="flex flex-col pt-0.5">
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">Profile settings</span>
                        <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-500 transition-colors mt-0.5">Manage details & preferences</span>
                      </div>
                    </a>

                    <a href="#activity" className="flex items-start gap-3 px-3 py-2.5 w-full text-left rounded-xl group hover:bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                      <div className="flex items-center justify-center shrink-0 w-9 h-9 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-sm border border-transparent group-hover:border-slate-200/60 transition-all duration-200">
                        <i className="ri-history-line text-[1.15rem]"></i>
                      </div>
                      <div className="flex flex-col pt-0.5">
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">Activity log</span>
                        <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-500 transition-colors mt-0.5">View your recent sessions</span>
                      </div>
                    </a>
                  </div>
                  
                  <div className="border-t border-slate-200/60"></div>
                  
                  {/* Logout Action */}
                  <div className="p-2">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-xl group hover:bg-rose-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50 active:scale-[0.98]">
                      <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-lg bg-white text-slate-400 group-hover:bg-rose-100 group-hover:text-rose-600 transition-all duration-200">
                        <i className="ri-logout-circle-r-line text-[1.1rem]"></i>
                      </div>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-rose-700 transition-colors">Sign out completely</span>
                    </button>
                  </div>

                </div>
              </>
            )}
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;