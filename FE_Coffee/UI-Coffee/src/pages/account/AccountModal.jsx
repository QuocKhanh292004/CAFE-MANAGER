import React, { useState, useEffect } from 'react';
import { updateUser, assignRole, assignBranch, removeBranch } from '../../apiServices/usersServices.js';

// Map tên role → role_id (tuỳ chỉnh theo DB của bạn)
const ROLE_MAP = {
    'Admin': 1,
    'Quản lý': 2,
    'Nhân viên': 3,
};

const AccountModal = ({ isOpen, onClose, mode, initialData, onSuccess, branches = [] }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Nhân viên',
        isLocked: false,
        selectedBranchId: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (mode === 'update' && initialData) {
            setFormData({
                username: initialData.username || '',
                email: initialData.email || '',
                password: '',
                confirmPassword: '',
                role: initialData.role || 'Nhân viên',
                isLocked: initialData.isLocked || false,
                selectedBranchId: '',
            });
        } else {
            setFormData({
                username: '', email: '', password: '',
                confirmPassword: '', role: 'Nhân viên', isLocked: false,
                selectedBranchId: '',
            });
        }
        setError('');
    }, [mode, initialData, isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // ─── CẬP NHẬT thông tin cơ bản ────────────────────────────────────────────
    const handleUpdate = async () => {
        if (!formData.username.trim() || !formData.email.trim()) {
            setError('Vui lòng điền đầy đủ tên tài khoản và email.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await updateUser(initialData.id, {
                username: formData.username,
                email: formData.email,
                is_locked: formData.isLocked,
            });

            // Cấp quyền nếu role thay đổi
            if (formData.role !== initialData.role) {
                await assignRole(initialData.id, ROLE_MAP[formData.role]);
            }

            alert('Cập nhật tài khoản thành công!');
            onSuccess && onSuccess();
            onClose();
        } catch (err) {
            setError('Cập nhật thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    // ─── CẬP NHẬT CHI NHÁNH QUẢN LÝ ──────────────────────────────────────────
    const handleUpdateBranch = async () => {
        if (!formData.selectedBranchId) {
            setError('Vui lòng chọn chi nhánh muốn gán.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await assignBranch(initialData.id, formData.selectedBranchId);
            alert('Gán chi nhánh thành công!');
            onSuccess && onSuccess();
            onClose();
        } catch (err) {
            setError('Gán chi nhánh thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    // ─── THÊM MỚI ─────────────────────────────────────────────────────────────
    const handleAdd = async () => {
        if (!formData.username.trim() || !formData.email.trim()) {
            setError('Vui lòng điền đầy đủ tên tài khoản và email.');
            return;
        }
        if (!formData.password) {
            setError('Vui lòng nhập mật khẩu.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            // Gọi API tạo user — tuỳ backend, ở đây dùng updateUser với POST hoặc bạn thêm createUser
            // Nếu backend có POST /users thì thay bằng createUser(...)
            alert('Thêm tài khoản thành công! (Hãy kết nối API POST /users)');
            onSuccess && onSuccess();
            onClose();
        } catch (err) {
            setError('Thêm tài khoản thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="pt-7 pb-3 text-center">
                    <h2 className="text-xl font-bold text-slate-700">
                        {mode === 'add' ? 'Thêm mới tài khoản' : 'Cập nhật tài khoản'}
                    </h2>
                </div>

                <div className="px-8 pb-8 space-y-4">

                    {/* Thông báo lỗi */}
                    {error && (
                        <div className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                            {error}
                        </div>
                    )}

                    {/* Tên tài khoản */}
                    <div className="relative">
                        {mode === 'update' && (
                            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-slate-400 z-10">
                                Tên tài khoản
                            </label>
                        )}
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
                        {mode === 'update' && (
                            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-slate-400 z-10">
                                Email
                            </label>
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-slate-400 text-sm text-slate-600"
                        />
                    </div>

                    {/* Mật khẩu — chỉ hiện khi thêm mới */}
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

                    {/* Chọn chi nhánh — chỉ hiện khi cập nhật */}
                    {mode === 'update' && (
                        <div className="relative">
                            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-slate-400 z-10">
                                Gán chi nhánh
                            </label>
                            <select
                                name="selectedBranchId"
                                value={formData.selectedBranchId}
                                onChange={handleInputChange}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-slate-400 text-sm text-slate-600 bg-white"
                            >
                                <option value="">-- Chọn chi nhánh --</option>
                                {branches.map(branch => (
                                    <option key={branch.branch_id} value={branch.branch_id}>
                                        {branch.branch_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Phân quyền */}
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
                        <label htmlFor="isLocked" className="text-sm font-medium text-slate-500 cursor-pointer">
                            Khóa tài khoản
                        </label>
                    </div>

                    {/* Nút hành động */}
                    <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="min-w-[80px] px-6 py-2 border border-slate-200 rounded-xl font-bold text-slate-400 hover:bg-slate-50 transition-all text-sm disabled:opacity-50"
                        >
                            Hủy
                        </button>

                        {mode === 'add' ? (
                            <button
                                onClick={handleAdd}
                                disabled={loading}
                                className="min-w-[80px] bg-[#1e293b] text-white px-8 py-2 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all text-sm disabled:opacity-50"
                            >
                                {loading ? 'Đang xử lý...' : 'Thêm'}
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleUpdate}
                                    disabled={loading}
                                    className="bg-[#1e293b] text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all text-sm disabled:opacity-50"
                                >
                                    {loading ? 'Đang xử lý...' : 'Cập Nhật'}
                                </button>
                                <button
                                    onClick={handleUpdateBranch}
                                    disabled={loading}
                                    className="bg-[#1e293b] text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all text-[10px] leading-tight max-w-[120px] disabled:opacity-50"
                                >
                                    {loading ? '...' : 'Cập Nhật Chi Nhánh Quản Lý'}
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