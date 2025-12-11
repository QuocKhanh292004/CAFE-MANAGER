import config from "../config/index.js";
import DefaultLayout from "../layouts/defaultLayout";
import ForgotPassword from "../pages/auth/forgotPassword/ForgotPassword.jsx";
import Login from "../pages/auth/login/Login.jsx";
import Register from "../pages/auth/register/Register.jsx";
import Home from "../pages/home/index.jsx";
import OrderPage from "../pages/order/index.jsx";
import CategoryPage from "../pages/category/index.jsx";
import BeveragePage from "../pages/beverage/index.jsx";
import BranchPage from "../pages/branch/index.jsx";
import tablePage from "../pages/table/index.jsx";
import AccountPage from "../pages/account/index.jsx"
import statisticsPage from "../pages/statistics/index.jsx";

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout
    },
    {
        path: config.routes.login,
        component: Login,
        layout: null
    },
    {
        path: config.routes.forgotPassword,
        component: ForgotPassword,
        layout: null
    },
    {
        path: config.routes.register,
        component: Register,
        layout: null,
    },
    {
        path: config.routes.order,
        component: OrderPage,
        layout: DefaultLayout
    },
    {
        path: config.routes.category,
        component: CategoryPage,
        layout: DefaultLayout
    },
    {
        path: config.routes.beverage,
        component: BeveragePage,
        layout: DefaultLayout
    },
    {
        path: config.routes.branch,
        component: BranchPage,
        layout: DefaultLayout
    },
    {
        path: config.routes.account,
        component: AccountPage,
        layout: DefaultLayout
    },
    {
        path: config.routes.table,
        component: tablePage,
        layout: DefaultLayout
    },
    {
        path: config.routes.statistics,
        component: statisticsPage,
        layout: DefaultLayout
    }
];
export default publicRoutes;
