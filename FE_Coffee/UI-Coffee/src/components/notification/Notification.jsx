import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Notification() {
     return (
         <button className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-indigo-600 text-slate-600 transition-all relative shadow-sm">
              <FontAwesomeIcon icon={faBell} className="text-[16px]" />
              <span className="absolute top-2.5 right-3 w-[7px] h-[7px] bg-rose-500 rounded-full border-2 border-white"></span>
         </button>
     )
}
export default Notification;