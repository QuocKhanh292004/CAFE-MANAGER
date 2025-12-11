import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import config from '../../../config';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log({email, password});
    };
    return (<div className="min-h-screen flex w-full bg-white font-sans">

            <div
                className="hidden lg:flex w-1/2 relative flex-col justify-end pb-16 px-12 overflow-hidden bg-stone-100">
                {/* Ảnh nền MỚI: Barista làm việc trong ánh sáng tự nhiên */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                    style={{backgroundImage: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop')"}}
                ></div>

                {/* Lớp phủ tối màu (Gradient) vẫn giữ để chữ trắng luôn nổi bật */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>

                {/* Nội dung slogan */}
                <div className="relative z-20 text-white mb-8">
                    <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
                    {/* Line trang trí */}
                    <h2 className="text-4xl font-bold mb-4 leading-snug">
                        Quản lý Cafe tinh gọn, <br/>
                        <span className="text-yellow-400">hiệu suất tối đa.</span>
                    </h2>
                    <p className="text-yellow-100/80 text-lg max-w-md">
                        Tập trung vào chất lượng đồ uống và dịch vụ khách hàng. Mọi số liệu phức tạp đã có hệ thống xử
                        lý.
                    </p>
                </div>
            </div>

            {/* --------------------------
        PHẦN 2: FORM ĐĂNG NHẬP (BÊN PHẢI)
      */}
            <div className="flex w-full lg:w-1/2 justify-center items-center p-8 bg-white">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-10">

                        <p className="text-gray-500">Vui lòng nhập đầy đủ thông tin.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Input Email */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="quanly@coffee.com"
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-600 transition-all"
                                required
                            />
                        </div>

                        {/* Input Password */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-600 transition-all pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-yellow-700 font-semibold text-sm transition-colors"
                                >
                                    {showPassword ? 'Ẩn' : 'Hiện'}
                                </button>
                            </div>
                        </div>

                        {/* Quên mật khẩu */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer select-none">
                                <input type="checkbox"
                                       className="w-4 h-4 rounded text-yellow-600 focus:ring-yellow-600 border-gray-300"/>
                                <span className="text-sm text-gray-600">Ghi nhớ tôi</span>
                            </label>
                            <Link  to ={config.routes.forgotPassword}
                               className="text-sm font-bold text-yellow-700 hover:text-yellow-800 hover:underline">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        {/* Nút Submit */}
                        <button
                            type="submit"
                            className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-yellow-900/20 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Đăng Nhập
                        </button>

                        {/* Đăng ký */}
                        <div className="text-center mt-6">
                            <span className="text-gray-500 text-sm ">Chưa có tài khoản? </span>
                            <Link to={config.routes.register} className="font-bold text-yellow-700 hover:underline ml-1">
                                Đăng ký ngay
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>);
};

export default LogIn;