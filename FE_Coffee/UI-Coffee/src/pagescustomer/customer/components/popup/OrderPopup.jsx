const OrderPopup = ({ item }) => {
    if (!item) return null;
    return (
        <section className="hidden lg:flex w-[40%] items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-96">
                <h2 className="font-bold text-lg">{item.name}</h2>
                <p className="text-gray-500 mb-4">{item.price}</p>
                <input
                    placeholder="Ghi chú"
                    className="w-full border-b mb-6 outline-none"
                />
                <button className="w-full py-3 bg-yellow-400 rounded-full font-bold">
                    Thêm vào giỏ
                </button>
            </div>
        </section>
    );
};

export default OrderPopup;
