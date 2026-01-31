import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit, faTrashAlt, faSearch, faPlus,
    faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';
import usePagination from '../../hook/usePagination.js';
import AccountModal from './AccountModal.jsx'; // Bạn sẽ tạo modal này sau

function Account() {
    // Dữ liệu mẫu dựa trên ảnh screenshot
    const [allAccounts, setAllAccounts] = useState([
        { id: 1, username: 'admin123', role: 'Admin', email: 'admin123@gmail.com', branches: 'Chi nhánh 1, Chi nhánh 2, Chi nhánh 3, Chi nhánh 4, Chi nhánh 5', isLocked: false },
        { id: 2, username: 'user123', role: 'Nhân viên', email: 'user@gmail.com', branches: 'Chi nhánh 5', isLocked: false },
        { id: 3, username: 'RECEPTIONIST', role: 'Nhân viên', email: 'RECEPTIONIST@gmail.com', branches: 'Chi nhánh 3', isLocked: false },
        { id: 4, username: 'superadmin', role: 'Admin', email: 'superadmin@gmail.com', branches: 'Chi nhánh 1, Chi nhánh 2, Chi nhánh 3, Chi nhánh 4', isLocked: false },
    ]);

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedAccount, setSelectedAccount] = useState(null);

    // Sử dụng hook phân trang của bạn
    const {
        currentPage, totalPages, totalItems, startItem, endItem, currentData, goToPage,
    } = usePagination(allAccounts, itemsPerPage);

    const handleOpenAdd = () => {
        setModalMode('add');
        setSelectedAccount(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (account) => {
        setModalMode('update');
        setSelectedAccount(account);
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white min-h-screen text-slate-700 font-sans">
            {/* Tiêu đề & Nút Thêm */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">Quản lý tài khoản</h2>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 bg-[#1e293b] hover:bg-slate-900 text-white px-5 py-2 rounded-lg shadow-md transition-all active:scale-95 text-sm"
                >
                    <FontAwesomeIcon icon={faPlus} /> Thêm Mới
                </button>
            </div>

            {/* Bộ lọc */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                <input
                    type="text"
                    placeholder="Tên tài khoản"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none text-sm bg-slate-50/50"
                />
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none text-sm bg-slate-50/50 text-slate-400">
                    <option>Chi nhánh</option>
                </select>
                <button className="bg-[#1e293b] hover:bg-slate-900 text-white rounded-lg font-bold text-sm h-[42px] flex items-center justify-center gap-2 shadow-sm transition-all">
                    <FontAwesomeIcon icon={faSearch} /> Tìm Kiếm
                </button>
            </div>

            {/* Bảng dữ liệu */}
            <div className="border border-slate-100 rounded-xl shadow-sm overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead>
                        <tr className="bg-slate-50/80 text-slate-600 text-[11px] uppercase tracking-widest font-black">
                            <th className="py-4 px-4 text-left">Tên tài khoản</th>
                            <th className="py-4 px-4 text-left border-x border-slate-100">Loại tài khoản</th>
                            <th className="py-4 px-4 text-left border-r border-slate-100">Email</th>
                            <th className="py-4 px-4 text-left border-r border-slate-100">Chi nhánh quản lý</th>
                            <th className="py-4 px-4 text-center border-r border-slate-100">Khóa tài khoản</th>
                            <th className="py-4 px-4 text-center">Thao tác</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                        {currentData.map((account) => (
                            <tr key={account.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-4 font-medium text-slate-700">{account.username}</td>
                                <td className="py-4 px-4 border-x border-slate-50 text-slate-500">{account.role}</td>
                                <td className="py-4 px-4 border-r border-slate-50 text-slate-500">{account.email}</td>
                                <td className="py-4 px-4 border-r border-slate-50 text-slate-500 text-xs">{account.branches}</td>
                                <td className="py-4 px-4 border-r border-slate-50 text-center">
                                    <input
                                        type="checkbox"
                                        checked={account.isLocked}
                                        className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500 cursor-pointer"
                                        readOnly
                                    />
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex justify-center gap-4">
                                        <button onClick={() => handleOpenEdit(account)} className="text-slate-600 hover:text-slate-900 transition-colors">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="text-slate-300 hover:text-red-500 transition-colors">
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <div className="px-6 py-4 bg-white border-t border-slate-100 flex flex-col md:flex-row justify-end items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <div className="flex items-center gap-2">
                        <span>Tổng số trên 1 trang:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => { setItemsPerPage(Number(e.target.value)); goToPage(1); }}
                            className="bg-transparent border-none focus:ring-0 cursor-pointer text-slate-600 outline-none"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-slate-300">Hiển thị từ {startItem} - {endItem} trên tổng số {totalItems}</span>
                        <div className="flex items-center gap-1">
                            <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="p-2 disabled:opacity-20"><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>
                            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 disabled:opacity-20"><FontAwesomeIcon icon={faAngleLeft} /></button>
                            <span className="bg-[#1e293b] text-white w-7 h-7 flex items-center justify-center rounded-full shadow-md">{currentPage}</span>
                            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 disabled:opacity-20"><FontAwesomeIcon icon={faAngleRight} /></button>
                            <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="p-2 disabled:opacity-20"><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <AccountModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                initialData={selectedAccount}
            />
        </div>
    );
}

export default Account;