import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const UtilityBar = () => (
    <div className="w-20 bg-[#2D2D2D] flex flex-col items-center py-8 gap-10 text-white">
        <FontAwesomeIcon icon={faUser} />
        <FontAwesomeIcon icon={faBell} />
        <FontAwesomeIcon icon={faShoppingBasket} className="text-yellow-400" />
    </div>
);

export default UtilityBar;
