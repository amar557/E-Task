import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <div className="flex ">
      <div className="me-64">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
