import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDollarSign,
    faClipboardList,
    faUsers,
    faMugHot,
    faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
    return (
        <div className="space-y-6">

            {/* TIÊU ĐỀ */}
            <h1 className="text-2xl font-bold text-[#3E2723]">
                Tổng quan hoạt động
            </h1>

            {/* THỐNG KÊ NHANH */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {/* Doanh thu */}
                <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4 border border-[#E5D8C8]">
                    <div className="bg-green-100 text-green-700 w-12 h-12 flex items-center justify-center rounded-xl">
                        <FontAwesomeIcon icon={faDollarSign} size="lg" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Doanh thu hôm nay</p>
                        <p className="text-xl font-semibold">5,200,000đ</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <FontAwesomeIcon icon={faArrowUp} /> +12%
                        </p>
                    </div>
                </div>

                {/* Đơn hàng */}
                <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4 border border-[#E5D8C8]">
                    <div className="bg-blue-100 text-blue-700 w-12 h-12 flex items-center justify-center rounded-xl">
                        <FontAwesomeIcon icon={faClipboardList} size="lg" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Đơn hàng hôm nay</p>
                        <p className="text-xl font-semibold">128 đơn</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <FontAwesomeIcon icon={faArrowUp} /> +5%
                        </p>
                    </div>
                </div>

                {/* Khách hàng */}
                <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4 border border-[#E5D8C8]">
                    <div className="bg-yellow-100 text-yellow-700 w-12 h-12 flex items-center justify-center rounded-xl">
                        <FontAwesomeIcon icon={faUsers} size="lg" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Khách hôm nay</p>
                        <p className="text-xl font-semibold">89 khách</p>
                    </div>
                </div>

                {/* Sản phẩm bán chạy */}
                <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4 border border-[#E5D8C8]">
                    <div className="bg-red-100 text-red-700 w-12 h-12 flex items-center justify-center rounded-xl">
                        <FontAwesomeIcon icon={faMugHot} size="lg" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Sản phẩm bán chạy</p>
                        <p className="text-xl font-semibold">Cà phê sữa đá</p>
                    </div>
                </div>
            </div>

            {/* BIỂU ĐỒ DOANH THU – FAKE UI */}
            <div className="bg-white rounded-2xl shadow border border-[#E5D8C8] p-6">
                <h2 className="text-lg font-semibold mb-4 text-[#3E2723]">
                    Doanh thu 7 ngày gần nhất
                </h2>

                <div className="relative h-60 rounded-xl bg-gradient-to-br from-[#F7F3EE] to-[#EEDCC3] p-4 overflow-hidden">

                    {/* Lưới biểu đồ */}
                    <div className="absolute inset-0 grid grid-rows-5 opacity-20">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="border-b border-[#5D4037]" />
                        ))}
                    </div>

                    {/* Cột doanh thu */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-end gap-3 px-2">
                        {[40, 55, 60, 80, 75, 90, 70].map((h, i) => (
                            <div key={i} className="flex flex-col items-center flex-1">
                                <div
                                    style={{ height: `${h}%` }}
                                    className="w-full max-w-[22px] bg-[#C49A6C] rounded-xl shadow-md transition-all duration-700 ease-out hover:bg-[#A67C52]"
                                ></div>
                            </div>
                        ))}
                    </div>

                    {/* Line chart */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <polyline
                            points="
                    10,200
                    60,170
                    110,160
                    160,120
                    210,135
                    260,90
                    310,140
                "
                            fill="none"
                            stroke="#8B5E34"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-lg"
                        />

                        {/* Gradient dưới đường line */}
                        <defs>
                            <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#C49A6C" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#C49A6C" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        <polygon
                            points="
                    10,200
                    60,170
                    110,160
                    160,120
                    210,135
                    260,90
                    310,140
                    310,250
                    10,250
                "
                            fill="url(#lineGradient)"
                        />
                    </svg>
                </div>
            </div>


            {/* ĐƠN HÀNG GẦN ĐÂY */}
            <div className="bg-white rounded-2xl shadow border border-[#E5D8C8] p-6">
                <h2 className="text-lg font-semibold mb-4 text-[#3E2723]">
                    Đơn hàng gần đây
                </h2>

                <table className="w-full text-left">
                    <thead>
                    <tr className="text-sm text-gray-600 border-b">
                        <th className="py-2">Mã đơn</th>
                        <th className="py-2">Khách hàng</th>
                        <th className="py-2">Tổng tiền</th>
                        <th className="py-2">Trạng thái</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[
                        { id: "#DH001", name: "Nguyễn Thảo", total: "85.000đ", status: "Hoàn thành" },
                        { id: "#DH002", name: "Trần Minh", total: "55.000đ", status: "Đang pha chế" },
                        { id: "#DH003", name: "Lê Hoàng", total: "120.000đ", status: "Đang giao" },
                    ].map((item) => (
                        <tr key={item.id} className="border-b text-sm">
                            <td className="py-3">{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.total}</td>
                            <td className="text-green-700">{item.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default Home;