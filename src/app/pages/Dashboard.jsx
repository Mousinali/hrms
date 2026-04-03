import { metricsData, scheduleData, announcementsData } from '../../assets/data';
import DashChart from '../../components/DashChart';
import EmployeeTable from '../../components/EmployeeTable';


// --- COMPONENTS ---

export default function Dashboard() {
  return (
    <div className="w-full max-w-[1600px] mx-auto">
      
      {/* CSS Grid for Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* ================= LEFT COLUMN (Col Span 8) ================= */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          
          {/* 1. TOP CARD (Metrics & Chart) */}
          <div className="bg-white md:rounded-2xl border border-slate-200 flex flex-col lg:flex-row overflow-hidden">
            
            {/* Left Side: 2x2 Metrics Grid */}
            <div className="w-full lg:w-5/12 grid grid-cols-2 border-b lg:border-b-0 lg:border-r border-slate-200 relative">
              {/* Internal borders for the 2x2 grid */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 hidden md:block"></div>
              <div className="absolute top-0 left-1/2 w-px h-full bg-slate-200 hidden md:block"></div>

              {metricsData.map((item, idx) => (
                <div key={item.id} className={`p-6 flex flex-col justify-between border-b md:border-b-0 ${idx % 2 === 0 ? 'border-r md:border-r-0' : ''} border-slate-200`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.iconBg} mb-4`}>
                    <i className={`${item.icon} ${item.iconColor} text-xl`}></i>
                  </div>
                  <div>
                    <div className="flex items-end gap-3 mb-1">
                      <h2 className="text-2xl font-bold text-slate-800 leading-none">{item.value}</h2>
                      <span className={`flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-md ${item.isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                        <i className={item.isPositive ? 'ri-arrow-right-up-line mr-0.5' : 'ri-arrow-right-down-line mr-0.5'}></i>
                        {item.trend}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-500">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Employee Tracker Chart */}
            <DashChart />
          </div>

          {/* 2. EMPLOYEES STATUS TABLE */}
          <EmployeeTable />
        </div>


        {/* ================= RIGHT COLUMN (Col Span 4) ================= */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          {/* 3. UPCOMING SCHEDULE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Upcoming Schedule</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Today <i className="ri-calendar-event-line"></i>
              </button>
            </div>

            <div className="space-y-4">
              {scheduleData.map((item) => (
                <div key={item.id} className="relative pl-4">
                  {/* Left Priority Border */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${
                    item.color === 'rose' ? 'bg-rose-500' : 
                    item.color === 'orange' ? 'bg-orange-400' : 'bg-emerald-400'
                  }`}></div>

                  <div className="flex justify-between items-start mb-1">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase
                      ${item.color === 'rose' ? 'text-rose-600 bg-rose-50' : 
                        item.color === 'orange' ? 'text-orange-600 bg-orange-50' : 'text-emerald-600 bg-emerald-50'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.color === 'rose' ? 'bg-rose-500' : item.color === 'orange' ? 'bg-orange-500' : 'bg-emerald-500'}`}></span>
                      {item.priority}
                    </span>
                    <button className="text-slate-400 hover:text-slate-600">
                      <i className="ri-more-2-fill"></i>
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-slate-800 mb-1">{item.title}</h4>
                  <p className="text-xs font-medium text-slate-500 mb-3">{item.desc}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <img src={item.avatar} alt={item.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs font-bold text-slate-700">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <i className="ri-time-line"></i>
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. ANNOUNCEMENTS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Announcement</h3>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                See all
              </button>
            </div>

            <div className="space-y-5">
              {announcementsData.map((ann) => (
                <div key={ann.id} className="flex gap-4">
                  <div className="relative shrink-0 pt-1">
                    <img src={ann.avatar} alt="Author" className="w-10 h-10 rounded-full object-cover" />
                    {/* Online indicator dot */}
                    {ann.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 pr-4">
                    <h4 className="text-sm font-bold text-slate-800 leading-snug mb-1 line-clamp-2">
                      {ann.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-400">
                      {ann.time}
                    </p>
                  </div>
                  <button className="shrink-0 text-slate-400 hover:text-slate-600 self-start mt-1">
                    <i className="ri-more-2-fill text-lg"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}