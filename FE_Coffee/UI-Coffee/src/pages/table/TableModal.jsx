import React, { useState, useEffect } from 'react';

const TableModal = ({ isOpen, onClose, mode, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        branch: '',
        description: ''
    });
    // State để điều khiển modal hiển thị mã QR riêng biệt
    const [showQRView, setShowQRView] = useState(false);
    useEffect(() => {
        if (mode === 'update' && initialData) {
            setFormData({
                name: initialData.name || '',
                branch: initialData.branch || '',
                description: initialData.description || ''
            });
        } else {
            setFormData({ name: '', branch: '', description: '' });
        }
        setShowQRView(false); // Reset về màn hình nhập liệu khi mở modal
    }, [mode, initialData, isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    // Giao diện hiển thị mã QR để in (Phần bên phải trong ảnh image_bb9393.png)
    if (showQRView) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                <div className="bg-white w-full max-w-[320px] rounded-3xl shadow-2xl p-8 flex flex-col items-center animate-in zoom-in duration-200">
                    <div className="w-48 h-48 mb-8 border border-slate-100 p-2 rounded-xl">
                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${formData.name}`}
                            alt="Table QR"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex gap-4 w-full">
                        <button
                            onClick={() => setShowQRView(false)}
                            className="flex-1 py-2.5 bg-[#2d3a54] text-white rounded-xl font-bold shadow-md hover:bg-slate-800 transition-all"
                        >
                            Đóng
                        </button>
                        <button
                            className="flex-1 py-2.5 bg-[#f04b7c] text-white rounded-xl font-bold shadow-md hover:bg-pink-600 transition-all"
                        >
                            In QR
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="pt-8 pb-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-700">
                        {mode === 'add' ? 'Thêm mới bàn' : 'Cập nhật bàn'}
                    </h2>
                </div>

                <div className="px-10 pb-10 space-y-6">
                    {/* Tên bàn */}
                    <div className="relative">
                        {mode === 'update' && (
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-slate-400 z-10">Tên bàn</label>
                        )}
                        <input
                            type="text"
                            name="name"
                            placeholder="Tên bàn"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-slate-400 text-slate-600"
                        />
                    </div>

                    {/* Chi nhánh - Select */}
                    <div className="relative">
                        {mode === 'update' && (
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-slate-400 z-10">Chi nhánh</label>
                        )}
                        <select
                            name="branch"
                            value={formData.branch}
                            onChange={handleInputChange}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-slate-400 text-slate-600 bg-white appearance-none"
                        >
                            <option value="">Chi nhánh</option>
                            <option value="Chi nhánh 4">Chi nhánh 4</option>
                            <option value="Chi nhánh 5">Chi nhánh 5</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Mô tả - Textarea */}
                    <div className="relative">
                        {mode === 'update' && (
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-slate-400 z-10">Mô tả</label>
                        )}
                        <textarea
                            name="description"
                            placeholder="Mô tả"
                            rows="3"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-slate-400 text-slate-600 resize-none"
                        />
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-center items-center gap-4 pt-4">
                        <button
                            onClick={onClose}
                            className="min-w-[100px] py-2 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all shadow-sm"
                        >
                            Hủy
                        </button>

                        <button
                            onClick={() => {
                                // Nếu là cập nhật, sau khi nhấn cập nhật có thể mở xem QR (giả lập theo luồng ảnh)
                                if (mode === 'update') setShowQRView(true);
                                else onClose();
                            }}
                            className="min-w-[100px] bg-[#2d3a54] text-white py-2 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all"
                        >
                            {mode === 'add' ? 'Thêm' : 'Cập Nhật'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableModal;