const MenuItem = ({ item, onClick }) => (
    <div
        onClick={() => onClick(item)}
        className="flex items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md cursor-pointer"
    >
        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4" />
        <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.price}</p>
        </div>
    </div>
);

export default MenuItem;
