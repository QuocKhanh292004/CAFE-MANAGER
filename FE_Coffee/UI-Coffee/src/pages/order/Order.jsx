import React, { useState } from "react";
import Pagination from "./Pagination.jsx";
import usePagination from "../../hook/usePagination.js";
import OrderDetails from "./OrderDetails.jsx";

const tableHeaders = [
    'Mã đơn', 'Ngày tạo', 'Chi nhánh', 'Bàn', 'Tổng tiền', 'Trạng Thái'
];
const StatusPill = ({ status }) => {
    const styles = {
        "Đã xác nhận": "bg-cyan-100 text-cyan-700 border-cyan-300",
        "Chờ xác nhận": "bg-yellow-100 text-yellow-700 border-yellow-300",
        "Đã hoàn thành": "bg-green-100 text-green-700 border-green-300",
    };

    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${styles[status]}`}>
            {status}
        </span>
    );
};

function Order() {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const allOrders = [
        { id: 30, time: "16:00", date: "07/11/2024", branch: "Chi nhánh 1", table: "Bàn 3", total: "150.000 đ", status: "Chờ xác nhận" },
        { id: 29, time: "15:45", date: "07/11/2024", branch: "Chi nhánh 2", table: "Bàn 7", total: "220.000 đ", status: "Đã hoàn thành" },
        { id: 28, time: "15:00", date: "07/11/2024", branch: "Chi nhánh 1", table: "Bàn 1", total: "350.000 đ", status: "Đã xác nhận" },
        { id: 27, time: "14:40", date: "06/11/2024", branch: "Chi nhánh 3", table: "Bàn 2", total: "180.000 đ", status: "Đã hoàn thành" },
        { id: 26, time: "14:30", date: "06/11/2024", branch: "Chi nhánh 5", table: "Bàn 5", total: "290.000 đ", status: "Đã xác nhận" },
        { id: 25, time: "14:00", date: "06/11/2024", branch: "Chi nhánh 2", table: "Bàn 10", total: "110.000 đ", status: "Chờ xác nhận" },
        { id: 24, time: "13:30", date: "05/11/2024", branch: "Chi nhánh 4", table: "Bàn 8", total: "400.000 đ", status: "Đã hoàn thành" },
        { id: 23, time: "13:15", date: "05/11/2024", branch: "Chi nhánh 5", table: "Bàn 5", total: "249.000 đ", status: "Đã xác nhận" },
        { id: 22, time: "12:00", date: "05/11/2024", branch: "Chi nhánh 5", table: "Bàn 1", total: "100.000 đ", status: "Chờ xác nhận" },
        { id: 21, time: "11:00", date: "04/11/2024", branch: "Chi nhánh 1", table: "Bàn 6", total: "275.000 đ", status: "Đã hoàn thành" },
    ];
    const {
        currentPage,
        totalPages,
        totalItems,
        startItem,
        endItem,
        currentData,
        goToPage
    } = usePagination(allOrders, 5);
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-xl">

                <h1 className="text-2xl font-bold mb-6 border-b pb-4">Quản lý đơn hàng</h1>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                        <tr>
                            {tableHeaders.map(h => (
                                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">{h}</th>
                            ))}
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentData.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{order.id}</td>
                                <td className="px-6 py-4">{order.time} {order.date}</td>
                                <td className="px-6 py-4">{order.branch}</td>
                                <td className="px-6 py-4">{order.table}</td>
                                <td className="px-6 py-4 font-semibold">{order.total}</td>
                                <td className="px-6 py-4"><StatusPill status={order.status} /></td>

                                <td className="px-6 py-4 text-right">
                                    {order.status === "Chờ xác nhận" && (
                                        <button className="text-cyan-600 mr-2">Xác nhận</button>
                                    )}
                                    <button
                                        className="text-gray-500"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-between text-sm text-gray-600">
                    <div>
                        Hiển thị {startItem} - {endItem} / Tổng {totalItems} đơn hàng
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToPage={goToPage}
                    />
                </div>
            </div>

            {selectedOrder && (
                <OrderDetails
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    );
}
export default Order;
