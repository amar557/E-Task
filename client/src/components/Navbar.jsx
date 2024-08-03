import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <ul className="flex items-center justify-between bg-slate-200 py-2 px-6">
        <li className="capitalize text-base font-medium">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="capitalize text-base font-medium">
          <NavLink to="/cart">cart</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
