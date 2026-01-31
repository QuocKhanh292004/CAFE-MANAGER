import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const MobileOrderDrawer = ({ open, item, onClose }) => {
    if (!open || !item) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50">
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 animate-slideUp">
                <div className="flex justify-between mb-4">
                    <h2 className="font-bold">{item.name}</h2>
                    <button onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <p className="text-gray-500 mb-4">{item.price}</p>

                <input
                    placeholder="Ghi chú"
                    className="w-full border-b mb-6 outline-none"
                />

                <button className="w-full py-4 bg-yellow-400 rounded-full font-bold">
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
};

export default MobileOrderDrawer;
