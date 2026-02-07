import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faShoppingCart,
    faBell,
    faUser,
    faMinus,
    faPlus,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import CategorySidebar from './CategorySidebar';
import MenuList from './MenuList';
import OrderPanel from './OrderPanel';

const Possystem = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [selectedBranch, setSelectedBranch] = useState('Chi nhánh 5');
    const [selectedTable, setSelectedTable] = useState('Bàn 5');
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    // Categories data
    const categories = [
        { id: 1, name: 'Tất cả', icon: '🌸', color: 'from-pink-400 to-pink-500' },
        { id: 2, name: 'Trà trái cây', icon: '🍓', color: 'from-red-400 to-orange-500' },
        { id: 3, name: 'Trà sữa', icon: '🧋', color: 'from-amber-400 to-yellow-500' },
        { id: 4, name: 'Đá xay', icon: '🍦', color: 'from-green-400 to-emerald-500' },
        { id: 5, name: 'Sinh tố', icon: '🥤', color: 'from-blue-400 to-cyan-500' },
        { id: 6, name: 'Cà phê', icon: '☕', color: 'from-amber-600 to-amber-700' },
        { id: 7, name: 'Nước ép', icon: '🧃', color: 'from-orange-400 to-red-500' }
    ];

    // Menu items data
    const menuItems = [
        { id: 1, name: 'Trà trái cây', price: 75000, category: 'Trà trái cây', desc: 'Trà trái cây', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
        { id: 2, name: 'Trà vải', price: 50000, category: 'Trà trái cây', desc: 'Trà vải', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
        { id: 3, name: 'Trà đào', price: 60000, category: 'Trà trái cây', desc: 'Trà đào', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
        { id: 4, name: 'Sữa tươi trân châu đường đen', price: 65000, category: 'Trà sữa', desc: 'Sữa tươi trân châu đường đen', image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400' },
        { id: 5, name: 'Trà sữa matcha', price: 59000, category: 'Trà sữa', desc: 'Trà sữa matcha', image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400' },
        { id: 6, name: 'Trà sữa khoai môn', price: 60000, category: 'Trà sữa', desc: 'Trà sữa khoai môn', image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400' },
    ];

    // Add to cart
    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
        setSelectedItem(item);
    };

    // Update quantity
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity === 0) {
            setCart(cart.filter(item => item.id !== id));
        } else {
            setCart(cart.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    // Remove from cart
    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Filter menu items
    const filteredItems = menuItems.filter(item => {
        const matchCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;
        const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Left Sidebar - Categories */}
            <CategorySidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            {/* Middle Section - Menu */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-white shadow-sm px-6 py-4 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Dropdowns */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <select
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                            >
                                <option>Chi nhánh 5</option>
                                <option>Chi nhánh 1</option>
                                <option>Chi nhánh 2</option>
                            </select>
                            <select
                                value={selectedTable}
                                onChange={(e) => setSelectedTable(e.target.value)}
                                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                            >
                                <option>Bàn 5</option>
                                <option>Bàn 1</option>
                                <option>Bàn 2</option>
                            </select>
                        </div>

                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                            />
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* User Actions */}
                        <div className="flex items-center gap-3">
                            <button className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                                <FontAwesomeIcon icon={faBell} className="text-gray-600 text-lg" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                                <FontAwesomeIcon icon={faShoppingCart} className="text-gray-600 text-lg" />
                            </button>
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <MenuList
                    items={filteredItems}
                    onAddToCart={addToCart}
                    selectedItem={selectedItem}
                />
            </div>

            {/* Right Panel - Order */}
            <OrderPanel
                cart={cart}
                total={total}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
                selectedItem={selectedItem}
                onCloseDetail={() => setSelectedItem(null)}
            />
        </div>
    );
};

export default Possystem;