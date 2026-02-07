import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMinus,
    faPlus,
    faTrash,
    faTimes,
    faShoppingBag
} from '@fortawesome/free-solid-svg-icons';

const OrderPanel = ({ cart, total, onUpdateQuantity, onRemoveFromCart, selectedItem, onCloseDetail }) => {
    return (
        <div className="w-full lg:w-96 xl:w-[28rem] bg-white shadow-2xl flex flex-col">
            {/* Order Header */}
            <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-orange-400 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon icon={faShoppingBag} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Đơn hàng</h2>
                        <p className="text-xs text-gray-500">
                            {cart.length} món
                        </p>
                    </div>
                </div>
            </div>

            {/* Item Detail Modal (nếu có selectedItem) */}
            {selectedItem && (
                <div className="px-6 py-4 bg-gradient-to-br from-pink-50 to-orange-50 border-b border-pink-100">
                    <div className="relative">
                        <button
                            onClick={onCloseDetail}
                            className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-gray-400 text-xs" />
                        </button>

                        <div className="bg-white rounded-2xl p-4 shadow-sm">
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.name}
                                className="w-full h-40 object-cover rounded-xl mb-3"
                            />
                            <h3 className="font-bold text-lg text-gray-800 mb-1">
                                {selectedItem.name} - {selectedItem.price.toLocaleString('vi-VN')} ₫
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">{selectedItem.category}</p>

                            {/* Options */}
                            <div className="space-y-2 mb-4">
                                <p className="text-xs font-semibold text-gray-700">Không đá hoặc thêm đá:</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-pink-100 rounded-lg text-xs font-medium transition-colors">
                                        Không đá
                                    </button>
                                    <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-pink-100 rounded-lg text-xs font-medium transition-colors">
                                        Thêm đá
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <p className="text-xs font-semibold text-gray-700">Nhiều ít đá:</p>
                                <input
                                    type="text"
                                    placeholder="Nhập ghi chú..."
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>

                            {/* Quantity selector */}
                            <div className="flex items-center justify-center gap-4 bg-gray-50 rounded-xl p-3">
                                <button className="w-10 h-10 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-pink-50 transition-all flex items-center justify-center">
                                    <FontAwesomeIcon icon={faMinus} className="text-gray-600 text-sm" />
                                </button>
                                <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">0</span>
                                <button className="w-10 h-10 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-pink-50 transition-all flex items-center justify-center">
                                    <FontAwesomeIcon icon={faPlus} className="text-gray-600 text-sm" />
                                </button>
                            </div>

                            {/* Add to cart button */}
                            <button className="w-full mt-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-800 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <div className="text-6xl mb-4">🛒</div>
                        <p className="text-sm font-medium">Giỏ hàng trống</p>
                        <p className="text-xs mt-1">Thêm món để bắt đầu</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors group"
                            >
                                <div className="flex gap-3">
                                    {/* Image */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-800 text-sm truncate mb-1">
                                            {item.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 mb-2">
                                            {item.price.toLocaleString('vi-VN')} ₫
                                        </p>

                                        {/* Quantity controls */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                className="w-7 h-7 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-pink-50 transition-all flex items-center justify-center"
                                            >
                                                <FontAwesomeIcon icon={faMinus} className="text-gray-600 text-xs" />
                                            </button>
                                            <span className="text-sm font-bold text-gray-800 min-w-[2rem] text-center">
                                                         {item.quantity}
                                                    </span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                className="w-7 h-7 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-pink-50 transition-all flex items-center justify-center"
                                            >
                                                <FontAwesomeIcon icon={faPlus} className="text-gray-600 text-xs" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Delete button */}
                                    <button
                                        onClick={() => onRemoveFromCart(item.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity self-start p-2 hover:bg-red-50 rounded-lg"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="text-red-400 hover:text-red-600 text-sm" />
                                    </button>
                                </div>

                                {/* Subtotal */}
                                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Tạm tính:</span>
                                    <span className="text-sm font-bold text-pink-600">
                                               {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                                          </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Order Summary */}
            {cart.length > 0 && (
                <div className="border-t border-gray-100 px-6 py-6 bg-gradient-to-br from-gray-50 to-white">
                    {/* Totals */}
                    <div className="space-y-3 mb-5">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tạm tính:</span>
                            <span className="font-semibold text-gray-800">
                                      {total.toLocaleString('vi-VN')} ₫
                                 </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Giảm giá:</span>
                            <span className="font-semibold text-green-600">- 0 ₫</span>
                        </div>
                        <div className="h-px bg-gray-200"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-base font-bold text-gray-800">Tổng cộng:</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                                      {total.toLocaleString('vi-VN')} ₫
                                 </span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2">
                        <button className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                            Thanh toán
                        </button>
                        <button className="w-full py-3 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl transition-all hover:bg-gray-50">
                            Lưu đơn
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderPanel;