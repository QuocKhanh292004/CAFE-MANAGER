import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
     faEdit,
     faTrashAlt,
     faPlus,
     faSearch,
     faAngleLeft,
     faAngleRight,
     faAngleDoubleLeft,
     faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';
import usePagination from '../../hook/usePagination.js';
import TableModal from './TableModal.jsx'; // Import Modal vừa tạo

function Table() {
     // Dữ liệu mẫu ban đầu
     const [allTables, setAllTables] = useState([
          { id: 1, name: 'Bàn 4', description: 'Bàn 4', branch: 'Chi nhánh 4', qr: 'https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=Table4' },
          { id: 2, name: 'Bàn 5', description: 'Bàn 5', branch: 'Chi nhánh 5', qr: 'https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=Table5' },
          { id: 3, name: 'Bàn 6', description: '3', branch: 'Chi nhánh 5', qr: 'https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=Table6' },
          { id: 4, name: 'Bàn 1', description: '1', branch: 'Chi nhánh 5', qr: 'https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=Table1' },
          { id: 5, name: 'Bàn 3', description: '3', branch: 'Chi nhánh 5', qr: 'https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=Table3' },
     ]);

     // State quản lý Modal
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [modalMode, setModalMode] = useState('add');
     const [selectedTable, setSelectedTable] = useState(null);

     // State quản lý số lượng hiển thị
     const [itemsPerPage, setItemsPerPage] = useState(5);

     const {
          currentPage,
          totalPages,
          totalItems,
          startItem,
          endItem,
          currentData,
          goToPage,
     } = usePagination(allTables, itemsPerPage);

     // Xử lý mở modal thêm mới
     const handleOpenAdd = () => {
          setModalMode('add');
          setSelectedTable(null);
          setIsModalOpen(true);
     };

     // Xử lý mở modal chỉnh sửa
     const handleOpenEdit = (table) => {
          setModalMode('update');
          setSelectedTable(table);
          setIsModalOpen(true);
     };


     const handleDelete = (id) => {
          if(window.confirm("Bạn có chắc chắn muốn xóa bàn này?")) {
               setAllTables(prev => prev.filter(t => t.id !== id));
          }
     };

     return (
         <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white min-h-screen text-slate-700 font-sans">
              {/* Header: Tiêu đề và nút Thêm mới */}
              <div className="flex justify-between items-center mb-6">
                   <h2 className="text-xl md:text-2xl font-bold text-slate-800">Quản lý bàn</h2>
                   <button
                       onClick={handleOpenAdd}
                       className="flex items-center gap-2 bg-[#1e293b] hover:bg-slate-900 text-white px-5 py-2 rounded-lg shadow-md transition-all text-sm font-semibold active:scale-95"
                   >
                        <FontAwesomeIcon icon={faPlus} className="text-xs" />
                        Thêm Mới
                   </button>
              </div>

              {/* Filter Area: Thanh tìm kiếm */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-8">
                   <div className="md:col-span-5">
                        <input
                            type="text"
                            placeholder="Tên bàn"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm focus:border-slate-400 bg-slate-50/30"
                        />
                   </div>
                   <div className="md:col-span-5">
                        <select className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm focus:border-slate-400 bg-slate-50/30 text-slate-500">
                             <option value="">Chi nhánh</option>
                             <option value="4">Chi nhánh 4</option>
                             <option value="5">Chi nhánh 5</option>
                        </select>
                   </div>
                   <div className="md:col-span-2">
                        <button className="w-full h-full bg-[#1e293b] hover:bg-slate-900 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm">
                             <FontAwesomeIcon icon={faSearch} />
                             Tìm Kiếm
                        </button>
                   </div>
              </div>

              {/* Table Area: Bảng danh sách */}
              <div className="border border-slate-100 rounded-xl shadow-sm overflow-hidden bg-white">
                   <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[800px]">
                             <thead>
                             <tr className="bg-slate-50 text-slate-600 text-[11px] uppercase tracking-widest font-black">
                                  <th className="py-4 px-6 text-left">Tên bàn</th>
                                  <th className="py-4 px-6 text-left border-x border-slate-100">Mô tả</th>
                                  <th className="py-4 px-6 text-left border-r border-slate-100">Chi nhánh</th>
                                  <th className="py-4 px-6 text-left border-r border-slate-100">Mã QR</th>
                                  <th className="py-4 px-6 text-center w-32">Thao tác</th>
                             </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-50 text-sm">
                             {currentData.length > 0 ? (
                                 currentData.map((table) => (
                                     <tr key={table.id} className="hover:bg-slate-50/50 transition-colors">
                                          <td className="py-4 px-6 text-slate-700 font-medium">{table.name}</td>
                                          <td className="py-4 px-6 border-x border-slate-50 text-slate-500 italic">{table.description}</td>
                                          <td className="py-4 px-6 border-r border-slate-50 text-slate-500">{table.branch}</td>
                                          <td className="py-2 px-6 border-r border-slate-50">
                                               <img
                                                   src={table.qr}
                                                   alt="QR Code"
                                                   className="w-10 h-10 object-contain border border-slate-100 p-1 rounded bg-white"
                                               />
                                          </td>
                                          <td className="py-4 px-6">
                                               <div className="flex justify-center gap-4">
                                                    <button
                                                        onClick={() => handleOpenEdit(table)}
                                                        className="text-slate-600 hover:text-slate-900 transition-colors"
                                                    >
                                                         <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(table.id)}
                                                        className="text-slate-300 hover:text-red-500 transition-colors"
                                                    >
                                                         <FontAwesomeIcon icon={faTrashAlt} />
                                                    </button>
                                               </div>
                                          </td>
                                     </tr>
                                 ))
                             ) : (
                                 <tr>
                                      <td colSpan="5" className="py-10 text-center text-slate-400">Không có dữ liệu bàn</td>
                                 </tr>
                             )}
                             </tbody>
                        </table>
                   </div>

                   {/* Pagination Footer: Phân trang */}
                   <div className="px-6 py-4 bg-white border-t border-slate-100 flex flex-col md:flex-row justify-end items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <div className="flex items-center gap-2">
                             <span>Tổng số trên 1 trang:</span>
                             <select
                                 value={itemsPerPage}
                                 onChange={(e) => { setItemsPerPage(Number(e.target.value)); goToPage(1); }}
                                 className="bg-transparent border-none focus:ring-0 cursor-pointer text-slate-600 outline-none font-bold"
                             >
                                  <option value={5}>5</option>
                                  <option value={10}>10</option>
                                  <option value={20}>20</option>
                             </select>
                        </div>

                        <div className="flex items-center gap-4">
                        <span className="text-slate-300">
                            Hiển thị từ {startItem} - {endItem} trên tổng số {totalItems}
                        </span>
                             <div className="flex items-center gap-1">
                                  <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="p-2 disabled:opacity-20 hover:text-slate-600 transition-colors"><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>
                                  <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 disabled:opacity-20 hover:text-slate-600 transition-colors"><FontAwesomeIcon icon={faAngleLeft} /></button>

                                  <span className="bg-[#1e293b] text-white w-7 h-7 flex items-center justify-center rounded-full shadow-lg">
                                {currentPage}
                            </span>

                                  <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 disabled:opacity-20 hover:text-slate-600 transition-colors"><FontAwesomeIcon icon={faAngleRight} /></button>
                                  <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="p-2 disabled:opacity-20 hover:text-slate-600 transition-colors"><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
                             </div>
                        </div>
                   </div>
              </div>

              {/* Modal */}
              <TableModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  mode={modalMode}
                  initialData={selectedTable}
              />
         </div>
     );
}

export default Table;