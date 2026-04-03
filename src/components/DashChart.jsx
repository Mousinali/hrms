import React, { useState, useEffect } from "react";
import { chartData } from "../assets/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md p-3 border border-slate-100 shadow-xl rounded-xl min-w-[120px] z-50">
        <p className="text-xs font-bold text-slate-800 mb-2 border-b border-slate-50 pb-1">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill }} />
                <span className="text-[10px] font-medium text-slate-500 capitalize">{entry.name}</span>
              </div>
              <span className="text-xs font-bold text-slate-700">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const EmployeeTrackerChart = () => {
  const [filter, setFilter] = useState("week");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filterOptions = [
    { id: "week", label: "This Week" },
    { id: "lastWeek", label: "Last Week" },
    { id: "month", label: "This Month" },
  ];

  const currentLabel = filterOptions.find((opt) => opt.id === filter)?.label;

  const getFilteredData = () => {
    if (filter === "week") return chartData;
    if (filter === "lastWeek") {
      return chartData.map((item) => ({
        ...item,
        bot: Math.max(10, item.bot - 12),
        mid: Math.max(5, item.mid - 4),
        top: Math.max(2, item.top - 5),
      }));
    }
    if (filter === "month") {
      return chartData.map((item) => ({
        ...item,
        bot: Math.round(item.bot * 1.4),
        mid: Math.round(item.mid * 1.2),
        top: Math.round(item.top * 1.5),
      }));
    }
    return chartData;
  };

  return (
    <div className="w-full lg:w-7/12 p-6 pb-2 flex flex-col h-[350px] bg-white transition-all duration-300">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Employee Tracker
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Real-time attendance overview</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:border-indigo-300 transition-all active:scale-95 focus:outline-none"
          >
            <span>{currentLabel}</span>
            <i className={`ri-arrow-down-s-line text-lg transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-indigo-500" : ""}`}></i>
          </button>

          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-50 py-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setFilter(option.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-[calc(100%-16px)] mx-2 text-left px-3 py-2 text-sm font-semibold rounded-xl transition-all ${
                      filter === option.id
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={getFilteredData()} 
            /* IMPORTANT: margin.bottom: 20 ensures the labels aren't cut off 
               margin.left: -25 hides the empty YAxis gap while keeping numbers visible
            */
            margin={{ top: 10, right: 10, left: -25, bottom: 20 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
            
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              interval={0} // Forces all day labels to show
              tick={{ fontSize: 12, fontWeight: 600, fill: "#94a3b8" }}
              dy={12} // Vertical distance from the bottom of the bars
            />

            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 600, fill: "#cbd5e1" }}
            />

            <Tooltip 
              cursor={{ fill: "#f8fafc", radius: 8 }} 
              content={<CustomTooltip />} 
            />

            <Bar dataKey="bot" name="Present" stackId="a" fill="#4f46e5" barSize={32} />
            <Bar dataKey="mid" name="Remote" stackId="a" fill="#38bdf8" />
            <Bar dataKey="top" name="Leave" stackId="a" fill="#fbbf24" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeTrackerChart;