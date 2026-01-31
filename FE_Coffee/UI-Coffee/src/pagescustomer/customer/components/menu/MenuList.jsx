import MenuItem from "./ MenuItem.jsx"
const mockMenu = [
    { id: 1, name: "Trà đào", price: "60.000 đ" },
    { id: 2, name: "Trà vải", price: "50.000 đ" },
    { id: 3, name: "Cà phê sữa", price: "45.000 đ" },
];

const MenuList = ({ onSelect }) => {
    return (
        <div className="space-y-4">
            {mockMenu.map((item) => (
                <MenuItem key={item.id} item={item} onClick={onSelect} />
            ))}
        </div>
    );
};

export default MenuList;
