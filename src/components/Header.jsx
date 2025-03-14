import { Settings, User } from "lucide-react";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <div className="font-karantina flex w-full p-3 justify-between ">
      <NavLink to="/" className="text-3xl select-none text-primary">
        SwiftKeys
      </NavLink>
      <nav className="flex gap-3 text-primary">
        <NavLink
          to="/settings "
          className="hover:text-tertiary transition-all duration-150 hover:scale-105"
        >
          <Settings size={30}></Settings>
        </NavLink>
        <NavLink
          to="/account"
          className="hover:text-tertiary hover:scale-105 transition-all duration-150"
        >
          <User size={30}></User>
        </NavLink>
      </nav>
    </div>
  );
}
