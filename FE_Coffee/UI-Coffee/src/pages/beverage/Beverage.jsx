import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
     faEdit,
     faTrashAlt,
     faSearch,
     faPlus,
     faAngleLeft,
     faAngleRight,
     faAngleDoubleLeft,
     faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';
import usePagination from '../../hook/usePagination.js';
import BeverageModal from "./BeverageModal.jsx";


const Beverage = () => {
     // Dữ liệu mẫu đồ uống
     const [allBeverages, setAllBeverages] = useState([
          { id: 1, name: 'Trà trái cây', category: 'Trà trái cây', branch: 'Chi nhánh 5', desc: 'Trà trái cây tươi', price: 75000, outOfStock: false, image: 'https://via.placeholder.com/50' },
          { id: 2, name: 'Trà vải', category: 'Trà trái cây', branch: 'Chi nhánh 5', desc: 'Trà vải', price: 50000, outOfStock: false, image: 'https://via.placeholder.com/50' },
          { id: 3, name: 'Trà đào', category: 'Trà trái cây', branch: 'Chi nhánh 5', desc: 'Trà đào', price: 60000, outOfStock: false, image: 'https://via.placeholder.com/50' },
          { id: 4, name: 'Sữa tươi trân châu đường đen', category: 'Trà sữa', branch: 'Chi nhánh 5', desc: 'Sữa tươi trân châu đường đen', price: 65000, outOfStock: false, image: 'https://via.placeholder.com/50' },
          { id: 5, name: 'Cà phê muối', category: 'Cà phê', branch: 'Chi nhánh 1', desc: 'Cà phê muối đặc sản', price: 35000, outOfStock: true, image: 'https://via.placeholder.com/50' },
          { id: 6, name: 'Cà phê muối', category: 'Cà phê', branch: 'Chi nhánh 1', desc: 'Cà phê muối đặc sản', price: 35000, outOfStock: true, image: 'https://via.placeholder.com/50' },
          { id: 7, name: 'Cà phê muối', category: 'Cà phê', branch: 'Chi nhánh 1', desc: 'Cà phê muối đặc sản', price: 35000, outOfStock: true, image: 'https://via.placeholder.com/50' },
          { id: 8, name: 'Cà phê muối', category: 'Cà phê', branch: 'Chi nhánh 1', desc: 'Cà phê muối đặc sản', price: 35000, outOfStock: true, image: 'https://via.placeholder.com/50' },
     ]);

     const [isModalOpen, setIsModalOpen] = useState(false);
     const [modalMode, setModalMode] = useState('add');
     const [selectedBeverage, setSelectedBeverage] = useState(null);
     const [itemsPerPage, setItemsPerPage] = useState(5);

     // Sử dụng Hook usePagination của bạn
     const {
          currentPage,
          totalPages,
          totalItems,
          startItem,
          endItem,
          currentData,
          goToPage,
     } = usePagination(allBeverages, itemsPerPage);

     const handleOpenAdd = () => {
          setModalMode('add');
          setSelectedBeverage(null);
          setIsModalOpen(true);
     };

     const handleOpenEdit = (item) => {
          setModalMode('update');
          setSelectedBeverage(item);
          setIsModalOpen(true);
     };

     const handleSaveBeverage = (data) => {
          // Xử lý logic lưu/cập nhật tương tự như Category
          setIsModalOpen(false);
     };

     return (
         <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white min-h-screen text-slate-700 font-sans">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                   <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Quản lý đồ uống</h2>
                   <button
                       onClick={handleOpenAdd}
                       className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-slate-900 text-white px-5 py-2 rounded-lg shadow-sm transition-all font-semibold text-sm active:scale-95"
                   >
                        <FontAwesomeIcon icon={faPlus} className="text-xs" />
                        Thêm Mới
                   </button>
              </div>

              {/* Filter Bar (3 inputs + 1 button) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                   <input
                       type="text"
                       placeholder="Tên đồ uống"
                       className="w-full px-4 h-11 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/10 focus:border-slate-400 transition-all bg-white text-sm"
                   />
                   <select className="w-full px-4 h-11 border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-400 text-sm">
                        <option value="">Danh mục</option>
                   </select>
                   <select className="w-full px-4 h-11 border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-400 text-sm">
                        <option value="">Chi nhánh</option>
                   </select>
                   <button className="bg-[#1e293b] hover:bg-slate-900 text-white px-6 h-11 rounded-lg transition-all font-bold text-sm shadow-sm flex items-center justify-center gap-2">
                        <FontAwesomeIcon icon={faSearch} />
                        Tìm Kiếm
                   </button>
              </div>

              {/* Table Area */}
              <div className="border border-slate-100 rounded-xl shadow-sm bg-white overflow-hidden">
                   <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[1000px]">
                             <thead>
                             <tr className="bg-slate-50 text-slate-600 text-[11px] uppercase tracking-widest font-black">
                                  <th className="py-4 px-4 text-center">Hình ảnh</th>
                                  <th className="py-4 px-4 text-left border-x border-slate-100">Tên đồ uống</th>
                                  <th className="py-4 px-4 text-left border-r border-slate-100">Tên danh mục</th>
                                  <th className="py-4 px-4 text-left border-r border-slate-100">Chi nhánh</th>
                                  <th className="py-4 px-4 text-left border-r border-slate-100">Mô tả</th>
                                  <th className="py-4 px-4 text-center border-r border-slate-100">Giá tiền</th>
                                  <th className="py-4 px-4 text-center border-r border-slate-100">Hết món</th>
                                  <th className="py-4 px-4 text-center">Thao tác</th>
                             </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-50 text-sm">
                             {currentData.map((item) => (
                                 <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                      <td className="py-3 px-4">
                                           <div className="flex justify-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 shadow-sm"
                                                />
                                           </div>
                                      </td>
                                      <td className="py-3 px-4 border-x border-slate-50 text-slate-700 font-semibold">{item.name}</td>
                                      <td className="py-3 px-4 border-r border-slate-50 text-slate-500">{item.category}</td>
                                      <td className="py-3 px-4 border-r border-slate-50 text-slate-500">{item.branch}</td>
                                      <td className="py-3 px-4 border-r border-slate-50 text-slate-500 italic max-w-xs truncate">{item.desc}</td>
                                      <td className="py-3 px-4 border-r border-slate-50 text-center font-bold text-slate-600">
                                           {item.price.toLocaleString('vi-VN')} ₫
                                      </td>
                                      <td className="py-3 px-4 border-r border-slate-50 text-center">
                                           <input
                                               type="checkbox"
                                               checked={item.outOfStock}
                                               className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500 cursor-pointer"
                                               readOnly
                                           />
                                      </td>
                                      <td className="py-3 px-4">
                                           <div className="flex justify-center gap-4">
                                                <button onClick={() => handleOpenEdit(item)} className="text-slate-600 hover:text-slate-900 transition-colors" title="Sửa">
                                                     <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button className="text-slate-400 hover:text-red-500 transition-colors" title="Xóa">
                                                     <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                           </div>
                                      </td>
                                 </tr>
                             ))}
                             </tbody>
                        </table>
                   </div>

                   {/* Pagination Footer */}
                   <div className="px-6 py-4 bg-white border-t border-slate-100 flex flex-col md:flex-row justify-end items-center gap-6">
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                             <span>Tổng số trên 1 trang:</span>
                             <div className="flex items-center gap-1">
                                  <select
                                      value={itemsPerPage}
                                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                      className="bg-transparent border-none focus:ring-0 cursor-pointer text-slate-600 text-sm outline-none"
                                  >
                                       <option value={5}>5</option>
                                       <option value={10}>10</option>
                                  </select>
                             </div>
                        </div>

                        <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider">
                        <span className="text-slate-300">
                            Hiển thị từ {startItem} - {endItem} trên tổng số {totalItems}
                        </span>

                             <div className="flex items-center gap-1">
                                  <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="p-2 text-slate-300 hover:text-slate-600 disabled:opacity-20 transition-colors">
                                       <FontAwesomeIcon icon={faAngleDoubleLeft} />
                                  </button>
                                  <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 text-slate-300 hover:text-slate-600 disabled:opacity-20 transition-colors">
                                       <FontAwesomeIcon icon={faAngleLeft} />
                                  </button>
                                  {/* Hiển thị số trang phong cách Dashboard */}
                                  <div className="flex gap-1 mx-2">
                                       {[...Array(totalPages)].map((_, index) => (
                                           <button
                                               key={index + 1}
                                               onClick={() => goToPage(index + 1)}
                                               className={`w-8 h-8 flex items-center justify-center rounded-full font-bold transition-all ${
                                                   currentPage === index + 1
                                                       ? 'bg-[#1e293b] text-white shadow-lg'
                                                       : 'text-slate-400 hover:bg-slate-100'
                                               }`}
                                           >
                                                {index + 1}
                                           </button>
                                       ))}
                                  </div>

                                  <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 text-slate-300 hover:text-slate-600 disabled:opacity-20 transition-colors">
                                       <FontAwesomeIcon icon={faAngleRight} />
                                  </button>
                                  <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="p-2 text-slate-300 hover:text-slate-600 disabled:opacity-20 transition-colors">
                                       <FontAwesomeIcon icon={faAngleDoubleRight} />
                                  </button>
                             </div>
                        </div>
                   </div>
              </div>
              <BeverageModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  mode={modalMode}
                  initialData={selectedBeverage}
                  onSave={handleSaveBeverage}
              />
         </div>
     );
};

export default Beverage;