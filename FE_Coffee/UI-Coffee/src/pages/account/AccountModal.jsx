import React, { useState, useEffect } from 'react';
const AccountModal = ({ isOpen, onClose, mode, initialData, onSave }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Nhân viên',
        isLocked: false
    });
    useEffect(() => {
        if (mode === 'update' && initialData) {
            setFormData({
                username: initialData.username || '',
                email: initialData.email || '',
                password: '',
                confirmPassword: '',
                role: initialData.role || 'Nhân viên',
                isLocked: initialData.isLocked || false
            });
        } else {
            setFormData({
                username: '', email: '', password: '',
                confirmPassword: '', role: 'Admin', isLocked: false
            });
        }
    }, [mode, initialData, isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            {/* Thu nhỏ max-width từ lg xuống md để modal trông thon gọn hơn */}
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header: Giảm padding và kích thước chữ */}
                <div className="pt-7 pb-3 text-center">
                    <h2 className="text-xl font-bold text-slate-700">
                        {mode === 'add' ? 'Thêm mới tài khoản' : 'Cập nhật tài khoản'}
                    </h2>
                </div>

                <div className="px-8 pb-8 space-y-4">
                    {/* Tên tài khoản */}
                    <div className="relative">
                        {mode === 'update' && <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-slate-400 z-10">Tên tài khoản</label>}
                        <input
                            type="text"
                            name="username"
                            placeholder="Tên tài khoản"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-slate-400 text-sm text-slate-600"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        {mode === 'update' && <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-slate-400 z-10">Email</label>}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-slate-400 text-sm text-slate-600"
                        />
                    </div>

                    {mode === 'add' && (
                        <div className="space-y-4">
                            <input
                                type="password"
                                name="password"
                                placeholder="Mật khẩu"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-slate-400 text-sm text-slate-600"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Xác nhận mật khẩu"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-slate-400 text-sm text-slate-600"
                            />
                        </div>
                    )}

                    {/* Phân quyền - Radio Buttons */}
                    <div className="space-y-2 py-1">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Phân quyền</p>
                        <div className="space-y-1.5 ml-1">
                            {['Admin', 'Quản lý', 'Nhân viên'].map((role) => (
                                <label key={role} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="radio"
                                            name="role"
                                            value={role}
                                            checked={formData.role === role}
                                            onChange={handleInputChange}
                                            className="peer appearance-none w-4 h-4 border-2 border-slate-300 rounded-full checked:border-[#1e293b] transition-all"
                                        />
                                        <div className="absolute w-2 h-2 bg-[#1e293b] rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                                    </div>
                                    <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900">{role}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Khóa tài khoản */}
                    <div className="flex items-center gap-3 pt-1">
                        <input
                            type="checkbox"
                            id="isLocked"
                            name="isLocked"
                            checked={formData.isLocked}
                            onChange={handleInputChange}
                            className="w-4 h-4 rounded border-slate-300 text-[#1e293b] focus:ring-[#1e293b] cursor-pointer"
                        />
                        <label htmlFor="isLocked" className="text-sm font-medium text-slate-500 cursor-pointer">Khóa tài khoản</label>
                    </div>

                    {/* Nút hành động - Cân đối lại theo ảnh mẫu */}
                    <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="min-w-[80px] px-6 py-2 border border-slate-200 rounded-xl font-bold text-slate-400 hover:bg-slate-50 transition-all text-sm"
                        >
                            Hủy
                        </button>
                        {mode === 'add' ? (
                            <button className="min-w-[80px] bg-[#1e293b] text-white px-8 py-2 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all text-sm">
                                Thêm
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button className="bg-[#1e293b] text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all text-sm">
                                    Cập Nhật
                                </button>
                                <button className="bg-[#1e293b] text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all text-[10px] leading-tight max-w-[120px]">
                                    Cập Nhật Chi Nhánh Quản Lý
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountModal;