import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUtensils,
    faLeaf,
    faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const categories = [
    { id: 1, name: "Tất cả", icon: faUtensils },
    { id: 2, name: "Trà", icon: faLeaf },
    { id: 3, name: "Cà phê", icon: faCoffee },
];

const SidebarCategory = () => {
    return (
        <aside className="hidden md:flex w-28 bg-white border-r flex-col items-center py-8">
            <h1 className="font-bold text-sm mb-8">PVT</h1>
            <div className="flex flex-col gap-6">
                {categories.map((c) => (
                    <button
                        key={c.id}
                        className="flex flex-col items-center text-gray-400 hover:text-yellow-400"
                    >
                        <FontAwesomeIcon icon={c.icon} />
                        <span className="text-[11px] mt-1">{c.name}</span>
                    </button>
                ))}
            </div>
        </aside>
    );
};

export default SidebarCategory;
