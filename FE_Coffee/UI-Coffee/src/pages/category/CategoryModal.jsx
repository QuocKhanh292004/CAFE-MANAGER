import React, { useState, useEffect } from 'react';

const CategoryModal = ({ isOpen, onClose, mode, initialData, onSave }) => {
    const [name, setName] = useState('');
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (isOpen) {
            if (mode === 'update' && initialData) {
                setName(initialData.name);
                setPreview(initialData.image);
            } else {
                setName('');
                setPreview(null);
            }
        }
    }, [isOpen, mode, initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-10">
                    <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">
                        {mode === 'add' ? 'Thêm danh mục mới' : 'Cập nhật danh mục'}
                    </h2>

                    {/* Input Tên */}
                    <div className="relative mb-8">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tên danh mục"
                            className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all pt-7 text-slate-700"
                        />
                        <label className={`absolute left-5 top-2 text-[10px] font-bold uppercase tracking-widest transition-all ${name ? 'opacity-100 text-emerald-600' : 'opacity-0'}`}>
                            Tên danh mục
                        </label>
                    </div>

                    {/* Khu vực Ảnh */}
                    <div className="flex flex-col items-center gap-5">
                        <div className="w-32 h-32 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center text-slate-300">
                                    <span className="text-4xl text-emerald-400 opacity-60">🥤</span>
                                </div>
                            )}
                        </div>

                        <input type="file" id="fileCategory" className="hidden" onChange={handleImageChange} accept="image/*" />
                        <label htmlFor="fileCategory" className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold cursor-pointer transition-all shadow-md active:scale-95">
                            Ảnh Danh Mục
                        </label>

                        <p className="text-red-500 text-[11px] font-medium">
                            Lưu ý: Ảnh danh mục có dung lượng dưới 500Kb!
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-10">
                        <button onClick={onClose} className="flex-1 py-3.5 border border-slate-200 text-slate-500 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                            Hủy
                        </button>
                        <button
                            onClick={() => onSave({ name, image: preview })}
                            className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
                        >
                            {mode === 'add' ? 'Thêm' : 'Cập Nhật'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CategoryModal;