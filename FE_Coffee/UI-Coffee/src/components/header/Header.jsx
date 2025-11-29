import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBell,
    faUserCircle,
    faSearch,
    faMugHot
} from "@fortawesome/free-solid-svg-icons";

function Header({ onToggleMenu }) {
    return (
        <header className="sticky top-0 z-40 w-full bg-[#F7F3EE] border-b border-[#E5D8C8] shadow-sm">

            <div className="flex items-center justify-between px-4 sm:px-6 py-3">

                {/* --- LEFT: Menu button + Logo --- */}
                <div className="flex items-center gap-3">

                    {/* Nút mở sidebar (giống YouTube mobile) */}
                    <button
                        className="lg:hidden w-10 h-10 flex items-center justify-center
                                   rounded-lg bg-[#4B2E19] text-[#FFF8F0] shadow-md
                                   hover:bg-[#5c3a23] transition"
                        onClick={onToggleMenu}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-tr from-[#C49A6C] to-[#D7B48C] rounded-xl
                                        flex items-center justify-center shadow">
                            <FontAwesomeIcon icon={faMugHot} className="text-white text-lg" />
                        </div>
                        <span className="hidden sm:block text-lg font-bold text-[#4B2E19] tracking-wide">
                            CAFE MANAGER
                        </span>
                    </div>
                </div>

                {/* --- MIDDLE: Search bar (giống YouTube) --- */}
                <div className="hidden md:flex items-center w-[45%]">
                    <div className="flex items-center w-full bg-white border border-[#D8C8B4]
                                    rounded-full overflow-hidden shadow-sm">
                        <input
                            type="text"
                            placeholder="Tìm kiếm món, nhân viên, bàn phục vụ..."
                            className="flex-1 px-4 py-2 outline-none text-[#4B2E19] text-sm"
                        />
                        <button className="px-4 py-2 bg-[#4B2E19] text-white hover:bg-[#5c3a23] transition">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>

                {/* --- RIGHT: Icons giống YouTube --- */}
                <div className="flex items-center gap-4">

                    {/* Search Icon cho mobile */}
                    <button className="md:hidden w-10 h-10 flex items-center justify-center
                                       text-[#4B2E19] hover:bg-[#EFE7DD] rounded-full transition">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>

                    {/* Notification bell */}
                    <button className="w-10 h-10 flex items-center justify-center
                                       text-[#4B2E19] hover:bg-[#EFE7DD] rounded-full transition relative">
                        <FontAwesomeIcon icon={faBell} />
                        {/* Chấm đỏ thông báo */}
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Avatar admin */}
                    <button className="w-10 h-10 flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            className="text-3xl text-[#4B2E19]"
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
