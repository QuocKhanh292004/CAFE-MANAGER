import { faUsers, faChartBar, faSync, faDollarSign, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Home() {
    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            {/* Thanh điều hướng phụ */}
            <div className="flex justify-between items-center text-[12px]">
                <div className="text-green-500 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Last updated now
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-white border border-gray-100 rounded-lg font-semibold text-gray-600 shadow-sm hover:shadow-md transition">Customize Widget</button>
                    <button className="px-4 py-1.5 bg-[#6366F1] text-white rounded-lg font-semibold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition">Exports</button>
                </div>
            </div>

            {/* 4 Chỉ số hàng đầu - Card phẳng, viền cực mảnh */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MiniStat title="Leads" value="129" trend="+2%" icon={faUsers} />
                <MiniStat title="CLV" value="14d" trend="-4%" isDown icon={faSync} />
                <MiniStat title="Convertion Rate" value="24%" trend="+2%" icon={faChartBar} />
                <MiniStat title="Revenue" value="$1.4K" trend="-4%" isDown icon={faDollarSign} />
            </div>

            {/* Layout chính 2 cột */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Biểu đồ doanh thu lớn */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <p className="text-gray-400 text-[13px] font-medium mb-1">Revenue</p>
                            <div className="flex items-center gap-3">
                                <h2 className="text-3xl font-bold text-gray-900">$32.209</h2>
                                <span className="text-[11px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded">+22% vs last month</span>
                            </div>
                        </div>
                        <div className="flex bg-gray-50 p-1 rounded-xl">
                            {['1D', '1W', '1M', '6M', '1Y', 'ALL'].map(t => (
                                <button key={t} className={`px-4 py-1 text-[10px] font-bold rounded-lg transition-all ${t==='1Y' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>{t}</button>
                            ))}
                        </div>
                    </div>
                    {/* Fake Chart Bars - Tinh chỉnh độ mảnh */}
                    <div className="h-64 flex items-end justify-between gap-4 mt-4">
                        {[45, 35, 40, 30, 42, 25, 40, 38, 30, 22, 18, 12].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                <div className={`w-full max-w-[14px] rounded-t-[4px] transition-all duration-500 ${i === 11 ? 'bg-[#6366F1]' : 'bg-[#EEF2FF]'}`} style={{ height: `${h}%` }}></div>
                                <span className="text-[10px] font-bold text-gray-300 group-hover:text-gray-900">M{i+1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Widget Lịch & Sự kiện */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[14px] font-bold text-gray-900">Calendar</h3>
                        <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-300 cursor-pointer" />
                    </div>
                    {/* Phần lịch render đơn giản */}
                    <div className="grid grid-cols-7 text-center text-[11px] font-bold text-gray-400 mb-6 gap-y-4">
                        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
                        {[5,6,7,8,9,10,11].map(n => (
                            <div key={n} className={`py-1 cursor-pointer transition-all ${n===8 ? 'bg-[#6366F1] text-white rounded-full shadow-lg shadow-indigo-100' : 'text-gray-900 hover:bg-gray-50 rounded-full'}`}>{n}</div>
                        ))}
                    </div>
                    <div className="space-y-4 mt-8">
                        <EventItem title="Mesh Weekly Meeting" time="9:00 am - 10:00 am" color="bg-indigo-500" />
                        <EventItem title="Gamification Demo" time="10:45 am - 11:45 am" color="bg-orange-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}
// Sub-components hỗ trợ
const MiniStat = ({ title, value, trend, isDown, icon }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-gray-200 transition-all">
        <div className="flex justify-between items-center mb-4">
            <div className="w-9 h-9 border border-gray-50 rounded-full flex items-center justify-center text-gray-800 shadow-sm">
                <FontAwesomeIcon icon={icon} className="text-[12px]" />
            </div>
            <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-200 text-[12px]" />
        </div>
        <p className="text-[13px] font-bold text-gray-400 mb-1">{title}</p>
        <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isDown ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                {isDown ? '↓' : '↑'} {trend}
            </span>
        </div>
        <p className="text-[10px] text-gray-300 mt-2 font-medium">vs last week</p>
    </div>
);
const EventItem = ({ title, time, color }) => (
    <div className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
        <div className={`w-1 h-10 ${color} rounded-full`}></div>
        <div>
            <h4 className="text-[12px] font-bold text-gray-900">{title}</h4>
            <p className="text-[10px] text-gray-400 font-medium mt-1">{time}</p>
        </div>
    </div>
);
export default Home;