import { useState } from "react";
import Sidebar from "./admin/components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./admin/pages/Layout";
import AddProduct from "./admin/pages/AddProduct";
import Products from "./admin/pages/Orders";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Progress from "./admin/pages/Progress";
import Delivered from "./admin/pages/Delivered";
import DispatchedOrders from "./admin/pages/DispatchedOrders";
import YourOrder from "./pages/YourOrder";

function App() {
  const [s, sasdkfj] = useState(0);
  return (
    <div className="text-3xl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="your-orders" element={<YourOrder />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="add-product" element={<AddProduct />} />
            <Route path="all-orders" element={<Products />} />
            <Route path="in-progress" element={<Progress />} />
            <Route path="delivered" element={<Delivered />} />
            <Route path="dispatch-orders" element={<DispatchedOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
