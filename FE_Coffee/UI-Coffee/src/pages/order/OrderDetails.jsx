import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTruckFast, faCircleCheck, faXmark, faReceipt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const orderData = {
    id: "ORD-0023",
    status: "Xác nhận",
    createdAt: "22/12/2025 14:30",
    customerNote: "Giao hàng trước 5h chiều nhé, cảm ơn shop rất nhiều!", // Ghi chú chung của đơn hàng
    items: [
        { img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=100", name: "Matcha đá xay", quantity: 1, unitPrice: "70.000", totalPrice: "70.000", note: null },
        { img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=100", name: "Trà sữa matcha", quantity: 1, unitPrice: "59.000", totalPrice: "59.000", note: "Ít đá" },
    ],
};

const statusOrder = [
    { name: "Chờ xác nhận", icon: faClock },
    { name: "Xác nhận", icon: faTruckFast },
    { name: "Đã hoàn thành", icon: faCircleCheck },
];

function OrderDetails({ onClose }) {
    const currentStatusIndex = statusOrder.findIndex(s => s.name === orderData.status);
    const subTotal = orderData.items.reduce((sum, item) => sum + (parseInt(item.totalPrice.replace(/\./g, '')) || 0), 0);

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">

                {/* Close Button Compact */}
                <button onClick={onClose} className="absolute top-6 right-6 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all">
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <div className="flex flex-col md:flex-row h-full max-h-[85vh]">

                    {/* CỘT TRÁI: THÔNG TIN CHÍNH (60%) */}
                    <div className="flex-1 p-8 border-r border-slate-50 overflow-y-auto custom-scrollbar">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                                <FontAwesomeIcon icon={faReceipt} size="lg" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-slate-800 tracking-tight">Đơn hàng #{orderData.id}</h1>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{orderData.createdAt}</p>
                            </div>
                        </div>

                        {/* STEPPER THU GỌN */}
                        <div className="mb-10 px-2">
                            <div className="flex justify-between relative">
                                <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-100 z-0"></div>
                                <div className="absolute top-4 left-0 h-[2px] bg-indigo-500 z-0 transition-all duration-1000" style={{ width: `${(currentStatusIndex / (statusOrder.length - 1)) * 100}%` }}></div>
                                {statusOrder.map((step, index) => (
                                    <div key={index} className="relative z-10 flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${index <= currentStatusIndex ? "bg-indigo-500 border-white text-white shadow-md" : "bg-white border-slate-100 text-slate-300"}`}>
                                            <FontAwesomeIcon icon={step.icon} className="text-[10px]" />
                                        </div>
                                        <span className={`mt-2 text-[10px] font-black uppercase tracking-tighter ${index === currentStatusIndex ? "text-slate-800" : "text-slate-400"}`}>{step.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* TABLE THU GỌN */}
                        <div className="space-y-3">
                            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Danh sách món</h2>
                            <div className="bg-slate-50/50 rounded-3xl p-2 border border-slate-50">
                                <table className="w-full text-left">
                                    <tbody className="divide-y divide-slate-100">
                                    {orderData.items.map((item, idx) => (
                                        <tr key={idx} className="group">
                                            <td className="py-3 px-2">
                                                <div className="flex items-center gap-3">
                                                    <img src={item.img} alt="" className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                                                    <div>
                                                        <p className="font-bold text-slate-700 text-sm leading-tight">{item.name}</p>
                                                        {item.note && <p className="text-[10px] text-rose-500 italic font-medium">"{item.note}"</p>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-center font-black text-slate-400 text-xs">x{item.quantity}</td>
                                            <td className="py-3 px-2 text-right font-bold text-slate-800 text-sm">{item.totalPrice}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: GHI CHÚ & THANH TOÁN (40%) */}
                    <div className="w-full md:w-80 bg-slate-50/80 p-8 flex flex-col justify-between">
                        <div>
                            {/* PHẦN GHI CHÚ MỚI BỔ SUNG */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-3 text-slate-800">
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-indigo-500" />
                                    <h3 className="text-sm font-black uppercase tracking-wider">Ghi chú đơn</h3>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                                    <p className="text-xs text-slate-500 leading-relaxed italic">
                                        {orderData.customerNote ? `"${orderData.customerNote}"` : "Không có ghi chú nào cho đơn hàng này."}
                                    </p>
                                </div>
                            </div>

                            {/* TỔNG KẾT GỌN GÀNG */}
                            <div className="space-y-3 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                                <div className="flex justify-between text-xs font-medium text-slate-400">
                                    <span>Tạm tính</span>
                                    <span className="text-slate-700">{subTotal.toLocaleString('vi-VN')} đ</span>
                                </div>
                                <div className="flex justify-between text-xs font-medium text-slate-400">
                                    <span>Giảm giá</span>
                                    <span className="text-emerald-500">0 đ</span>
                                </div>
                                <div className="h-[1px] bg-slate-100 my-2"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Thanh toán</span>
                                    <span className="text-xl font-black text-slate-900 leading-none">{subTotal.toLocaleString('vi-VN')} đ</span>
                                </div>
                            </div>
                        </div>

                        <button onClick={onClose} className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95">
                            Xác nhận & Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;