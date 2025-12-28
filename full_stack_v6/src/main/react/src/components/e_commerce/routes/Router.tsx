import {Route, Routes} from "react-router-dom";
import {Cart} from "../pages/shop/Cart";
import {Login} from "../pages/auth/Login";
import {Home} from "../pages/Home";
import {Register} from "../pages/auth/Register.tsx";
import {APP_ROUTES} from "../utils/Constants.ts";
import {OrderManagement} from "../pages/admin/OrderManagement.tsx";
import {ProductManagement} from "../pages/admin/ProductManagement.tsx";
import {MyOrders} from "../pages/order/MyOrders.tsx";

export const AppRoutes = () => {

    return (
        <Routes>
            <Route
                index
                path={APP_ROUTES.HOME}
                element={<Home/>}
            />
            <Route
                path={APP_ROUTES.CART}
                element={<Cart/>}
            />
            <Route
                path={APP_ROUTES.LOGIN}
                element={<Login/>}
            />
            <Route
                path={APP_ROUTES.REGISTER}
                element={<Register/>}
            />
            <Route
                path={APP_ROUTES.MY_ORDERS}
                element={<MyOrders/>}
            />
            <Route
                path={APP_ROUTES.ADMIN.ORDER_MANAGEMENT}
                element={<OrderManagement/>}
            />
            <Route
                path={APP_ROUTES.ADMIN.PRODUCT_MANAGEMENT}
                element={<ProductManagement/>}
            />
        </Routes>
    )
}