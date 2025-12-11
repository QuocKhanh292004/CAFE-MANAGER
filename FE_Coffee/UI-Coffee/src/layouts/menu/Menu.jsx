import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Menu({ menuItems = [], activePath, isOpen, onClose }) {
    const location = useLocation();
    const currentPath = activePath || location.pathname;
    return (
        <>
            {/* BACKDROP MOBILE */}
            <div
                className={`
                    fixed top-16 inset-x-0 bottom-0 bg-black/50 
                    backdrop-blur-sm z-40 lg:hidden transition-all
                    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
                `}
                onClick={onClose}
            />
            {/* SIDEBAR */}
            <aside
                className={`
                    fixed top-16 left-0 z-50 
                    h-[calc(100vh-64px)]
                    w-[250px] sm:w-[260px] lg:w-[250px]
                    bg-[#3E2723] border-r border-[#5D4037]
                    shadow-2xl flex flex-col
                    transition-transform duration-300 ease-in-out
                    overflow-y-auto
                    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <nav className="flex-1 px-4 py-4 space-y-2 mt-3">
                    {menuItems.map((item) => {
                        const isActive = currentPath === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className={`
                                    flex items-center rounded-xl px-4 py-3 font-medium text-sm
                                    transition-all
                                    ${
                                    isActive
                                        ? "bg-[#D9A05B] text-[#3E2723] shadow-md"
                                        : "text-white hover:bg-[#4E342E]"
                                }
                                `}
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className={`
                                        w-5 h-5 mr-4
                                        ${
                                        isActive
                                            ? "text-[#3E2723]"
                                            : "text-[#FFD8A9]"
                                    }
                                    `}
                                />
                                {item.name}
                                {isActive && (
                                    <span className="ml-auto w-2 h-2 bg-[#3E2723] rounded-full animate-pulse"></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
export default Menu;
