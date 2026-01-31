import { useState } from "react";
import MenuList from "../components/menu/MenuList";
import OrderPopup from "../components/popup/OrderPopup";
import MobileOrderDrawer from "../components/popup/MobileOrderDrawer";
import useMediaQuery from "../hooks/useMediaQuery";
import MobileBottomBar from "../layoutcustomer/MobileBottomBar.jsx";
import UtilityBar from "../layoutcustomer/UtilityBar.jsx"
import SidebarCategory from "../layoutcustomer/SidebarCategory.jsx";
const FoodOrderDashboard = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [selectedItem, setSelectedItem] = useState(null);
    return (
        <div className="flex h-screen bg-[#F8F9FA]">
            <SidebarCategory />

            <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
                <MenuList onSelect={setSelectedItem} />
            </main>

            {!isMobile && <OrderPopup item={selectedItem} />}
            {isMobile && (
                <MobileOrderDrawer
                    open={!!selectedItem}
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}

            {isMobile ? <MobileBottomBar /> : <UtilityBar />}
        </div>
    );
};

export default FoodOrderDashboard;
