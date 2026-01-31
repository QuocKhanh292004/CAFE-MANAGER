import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faBell,
    faEnvelope,
    faShareNodes,
    faBars
} from "@fortawesome/free-solid-svg-icons";

function Header({ onToggleMenu }) {
    return (
        <header className="w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
            {/* Cụm bên trái: Icon Dashboard & Title */}
            <div className="flex items-center gap-4">

                <button
                    onClick={onToggleMenu}
                    className="lg:hidden text-slate-800 hover:text-indigo-600 transition-colors"
                >
                    <FontAwesomeIcon icon={faBars} size="lg" />
                </button>

                <div className="flex items-center gap-3">

                    <div className="text-indigo-600 flex gap-[2px] items-center">
                        <div className="w-[7px] h-4 bg-indigo-600 rounded-[2px]"></div>
                        <div className="flex flex-col gap-[2px]">
                            <div className="w-[7px] h-[7px] bg-slate-800 rounded-sm"></div>
                            <div className="w-[7px] h-[7px] bg-slate-400 rounded-sm"></div>
                        </div>
                    </div>
                    <h1 className="text-[17px] font-black text-slate-900 tracking-tight">
                        Dashboard
                    </h1>
                </div>
            </div>

            {/* Cụm bên phải: Search & Actions */}
            <div className="flex items-center gap-5">
                {/* Thanh Search - Đổi background để nổi bật hơn */}
                <div className="relative group hidden md:block">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                        <FontAwesomeIcon icon={faSearch} className="text-[14px]" />
                    </span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="pl-10 pr-4 py-2 w-64 text-[13px] text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 transition-all placeholder:text-slate-400 font-medium"
                    />
                </div>


                <div className="flex items-center gap-3">
                    {/* Bell Icon với chấm đỏ tươi */}
                    <button className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-indigo-600 text-slate-600 transition-all relative shadow-sm">
                        <FontAwesomeIcon icon={faBell} className="text-[16px]" />
                        <span className="absolute top-2.5 right-3 w-[7px] h-[7px] bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>

                    {/* Mail Icon với Badge đỏ đậm */}
                    <button className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-indigo-600 text-slate-600 transition-all relative shadow-sm">
                        <FontAwesomeIcon icon={faEnvelope} className="text-[16px]" />
                        <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-black px-1.5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md">
                            12
                        </span>
                    </button>

                    {/* Share Icon */}
                    <button className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-indigo-600 text-slate-600 transition-all shadow-sm">
                        <FontAwesomeIcon icon={faShareNodes} className="text-[16px]" />
                    </button>

                    {/* Đường kẻ ngăn cách */}
                    <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

                    {/* Giả lập Avatar người dùng */}
                    {/*<div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-300 transition-all">*/}
                    {/*    <img src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff" alt="avatar" />*/}
                    {/*</div>*/}
                </div>
            </div>
        </header>
    );
}

export default Header;