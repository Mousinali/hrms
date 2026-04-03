import React, { useState, useMemo } from "react";
import { employeesData } from "../assets/data";

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");

  const departments = useMemo(
    () => ["All", ...new Set(employeesData.map((emp) => emp.department))],
    [],
  );

  const filteredEmployees = useMemo(() => {
    return employeesData.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || emp.status === statusFilter;
      const matchesDept = deptFilter === "All" || emp.department === deptFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [searchTerm, statusFilter, deptFilter]);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 p-6 overflow-hidden flex flex-col">
      {/* --- HEADER & FILTERS --- */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
              Employees Status
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Direct management and status monitoring
            </p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-indigo-200">
            <i className="ri-user-add-line"></i>
            Add Employee
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative group">
            <i className="ri-search-2-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-indigo-500 transition-colors"></i>
            <input
              type="text"
              placeholder="Search employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="relative">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 appearance-none focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "All" ? "All Departments" : dept}
                </option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 appearance-none focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Onboarding">Onboarding</option>
            </select>
            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
          </div>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {/* Width set to 35% to give the profile section more room */}
              <th className="py-4 px-6 font-extrabold text-[11px] uppercase tracking-widest text-slate-400 rounded-tl-2xl w-[35%]">
                Employee Details
              </th>
              <th className="py-4 px-4 font-extrabold text-[11px] uppercase tracking-widest text-slate-400">
                Department
              </th>
              <th className="py-4 px-4 font-extrabold text-[11px] uppercase tracking-widest text-slate-400">
                Join Date
              </th>
              <th className="py-4 px-4 font-extrabold text-[11px] uppercase tracking-widest text-slate-400">
                Status
              </th>
              {/* Fixed width for actions to keep icons aligned */}
              <th className="py-4 px-6 font-extrabold text-[11px] uppercase tracking-widest text-slate-400 text-right rounded-tr-2xl w-[180px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50/50 transition-all group"
                >
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-11 h-11 rounded-2xl object-cover ring-2 ring-white shadow-sm"
                        />
                        <span
                          className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${emp.status === "Active" ? "bg-emerald-500" : "bg-slate-300"}`}
                        ></span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">
                          {emp.name}
                        </p>
                        <p className="text-xs font-medium text-slate-400 truncate">
                          {emp.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <span className="text-[13px] font-bold text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-xl whitespace-nowrap">
                      {emp.department}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-[13px] font-bold text-slate-500 whitespace-nowrap">
                    {emp.joinDate}
                  </td>
                  <td className="py-5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5  rounded-xl text-[13px] font-semibold caitalize whitespace-nowrap
                      ${
                        emp.status === "Active"
                          ? " text-emerald-600  "
                          : emp.status === "Inactive"
                            ? " text-rose-600  "
                            : " text-amber-600  "
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${emp.status === "Active" ? "bg-emerald-500 animate-pulse" : emp.status === "Inactive" ? "bg-rose-500" : "bg-amber-500"}`}
                      ></span>
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <div className="flex items-center justify-end">
                      {/* View - Ghost Style */}
                      <button
                        className="w-9 h-9 flex items-center justify-center text-indigo-600  hover:bg-indigo-50 rounded-xl transition-all duration-200 active:scale-90"
                        title="View Profile"
                      >
                        <i className="ri-eye-line text-lg"></i>
                      </button>

                      {/* Edit - Ghost Style */}
                      <button
                        className="w-9 h-9 flex items-center justify-center text-emerald-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 active:scale-90"
                        title="Edit Details"
                      >
                        <i className="ri-pencil-line text-lg"></i>
                      </button>

                      {/* Status - Ghost Style */}
                      <button
                        className="w-9 h-9 flex items-center justify-center text-rose-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 active:scale-90"
                        title="Login Status"
                      >
                        <i className="ri-shield-user-line text-lg"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200">
                      <i className="ri-user-search-line text-4xl"></i>
                    </div>
                    <p className="text-slate-500 font-bold">
                      No results match your search filters
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("All");
                        setDeptFilter("All");
                      }}
                      className="text-sm font-extrabold text-indigo-600 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
