import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const MobileBottomBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-[#2D2D2D] text-white flex justify-around py-3 z-50">
        <FontAwesomeIcon icon={faUser} />
        <FontAwesomeIcon icon={faBell} />
        <FontAwesomeIcon icon={faShoppingBasket} className="text-yellow-400" />
    </div>
);

export default MobileBottomBar;
