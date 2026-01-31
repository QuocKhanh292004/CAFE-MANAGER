import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import config from "../../../config";
import axios from "axios";
const LogIn = () => {
    const [email, setEmail] = useState("admin@restaurant.com");
    const [password, setPassword] = useState("Admin@123456");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:3000/api/auth/login",
                { email, password }
            );

            const { token, user } = res.data.data;

            //  GỌI CONTEXT LOGIN
            login({ token, user });

            //  ĐIỀU HƯỚNG
            navigate(config.routes.home, { replace: true });

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Email hoặc mật khẩu không chính xác"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex w-full bg-white font-sans">
            {/* LEFT */}
            <div className="hidden lg:flex w-1/2 relative flex-col justify-end pb-16 px-12 bg-stone-100">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=735&auto=format&fit=crop)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 text-white">
                    <div className="w-16 h-1 bg-yellow-400 mb-6" />
                    <h2 className="text-4xl font-bold mb-4">
                        Quản lý Cafe tinh gọn, <br />
                        <span className="text-yellow-400">hiệu suất tối đa.</span>
                    </h2>
                    <p className="text-yellow-100/80">
                        Tập trung vào chất lượng đồ uống và dịch vụ khách hàng.
                    </p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex w-full lg:w-1/2 justify-center items-center p-8">
                <div className="w-full max-w-md">
                    <p className="text-center text-gray-500 mb-8">
                        Vui lòng nhập đầy đủ thông tin
                    </p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-bold mb-2">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-sm text-gray-400"
                                >
                                    {showPassword ? "Ẩn" : "Hiện"}
                                </button>
                            </div>
                        </div>

                        {/* Ghi nhớ + Quên mật khẩu */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded text-yellow-600 focus:ring-yellow-600"
                                />
                                <span className="text-sm text-gray-600">Ghi nhớ tôi</span>
                            </label>

                            <Link
                                to={config.routes.forgotPassword}
                                className="text-sm font-bold text-yellow-700 hover:underline"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-red-600 text-sm font-semibold">{error}</p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-xl font-bold text-white ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-yellow-700 hover:bg-yellow-800"
                            }`}
                        >
                            {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                        </button>

                        {/* Register */}
                        <div className="text-center">
                            <span className="text-sm text-gray-500">Chưa có tài khoản?</span>
                            <Link
                                to={config.routes.register}
                                className="ml-1 font-bold text-yellow-700"
                            >
                                Đăng ký ngay
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default LogIn;
