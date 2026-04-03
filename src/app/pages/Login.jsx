import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(form.username, form.password);
    if (success) navigate("/dashboard");
    else alert("Invalid credentials");
  };

  return (
    <div className="min-h-screen flex bg-white">
      
      {/* LEFT SECTION: Minimalist Login Form */}
      <div className="w-full lg:w-[45%] flex flex-col p-8 md:p-16 lg:p-24">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 mb-12">
          <div className="bg-[#063b3b] w-12 h-12 flex items-center justify-center rounded-full shadow-lg shadow-teal-900/20">
            <i className="ri-focus-3-line text-white text-2xl"></i>
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">Smart HR</span>
        </div>

        <div className="max-w-md w-full mx-auto lg:mx-0">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">Welcome Back</h1>
            <p className="text-slate-500 text-base leading-relaxed">
              Please enter your employee credentials to access the portal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1 block">
                Username Address <span className="text-teal-600 font-bold">*</span>
              </label>
              <div className="relative group">
                <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-700 transition-colors"></i>
                <input
                  type="text"
                  required
                  placeholder="Enter your username"
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-50 transition-all text-slate-800"
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1 block">
                Password <span className="text-teal-600 font-bold">*</span>
              </label>
              <div className="relative group">
                <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-700 transition-colors"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-50 transition-all text-slate-800"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-700 transition-colors"
                >
                  <i className={showPassword ? "ri-eye-off-line text-lg" : "ri-eye-line text-lg"}></i>
                </button>
              </div>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 checked:bg-teal-700 checked:border-teal-700 transition-all focus:ring-2 focus:ring-teal-100" 
                  />
                  <i className="ri-check-line absolute left-1 text-white text-xs opacity-0 peer-checked:opacity-100"></i>
                </div>
                <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors select-none">Remember me</span>
              </label>
              
              <button type="button" className="text-sm font-bold text-teal-700 hover:text-teal-800 hover:underline transition-all">
                Forgot password?
              </button>
            </div>

            {/* Advanced Pressable Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#063b3b] hover:bg-[#084d4d] text-white font-bold py-4 rounded-2xl transition-all 
                           active:scale-[0.96] active:translate-y-0.5 shadow-[0_8px_20px_-5px_rgba(6,59,59,0.3)] 
                           flex items-center justify-center gap-3 group"
              >
                Sign In
                <i className="ri-login-box-line group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-16 text-[10px] text-slate-400 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start uppercase tracking-[0.1em] font-bold">
          <span>© 2026 Smart HR, Made by SM Mousin Ali</span>
        </footer>
      </div>

      {/* RIGHT SECTION: Feature Display */}
      <div className="hidden lg:flex lg:w-[55%] bg-[#063b3b] relative items-center justify-center p-12 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        
        <div className="relative z-10 w-full max-w-lg">
          {/* HR Insight Cards */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="h-14 w-14 rounded-2xl bg-teal-400/20 flex items-center justify-center">
                  <i className="ri-bar-chart-2-line text-teal-300 text-2xl"></i>
                </div>
                <div className="text-right">
                  <p className="text-teal-100/50 text-xs font-bold uppercase tracking-widest">Active Headcount</p>
                  <p className="text-white text-3xl font-bold">1,284</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-2 flex-1 bg-teal-400/40 rounded-full"></div>
                <div className="h-2 flex-1 bg-teal-400/20 rounded-full"></div>
                <div className="h-2 w-12 bg-white/10 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-2xl transform translate-x-10 ring-8 ring-teal-900/20">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center">
                  <i className="ri-calendar-event-line text-indigo-600 text-2xl"></i>
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-xs font-bold uppercase">Upcoming Holidays</p>
                  <p className="text-slate-900 font-bold text-lg leading-tight">Founder's Day Celebration</p>
                  <p className="text-slate-500 text-sm mt-1">Friday, April 10, 2026</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center text-white px-4">
            <h2 className="text-4xl font-bold mb-6 leading-tight tracking-tight">
              A Unified Hub for Smarter <br /> 
              <span className="text-teal-400 italic">Workforce Management</span>
            </h2>
            <p className="text-teal-100/40 text-base max-w-sm mx-auto leading-relaxed">
              Kezak empowers you with a unified employee command center delivering deep insights for your entire world.
            </p>
          </div>
          
          {/* Slider Pagination */}
          <div className="flex justify-center gap-3 mt-12">
            <div className="h-1.5 w-16 bg-white rounded-full"></div>
            <div className="h-1.5 w-4 bg-white/20 rounded-full"></div>
            <div className="h-1.5 w-4 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}