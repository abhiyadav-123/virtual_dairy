import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import ThemeController from "../ThemeController";
import NavProfile from "./NavProfile";
import SearchBox from "./SearchBox";
import logo from "../../assets/nav2.jpg";


const Navbar = () => {
  return (
    <div className="navbar bg-base-300 w-full sticky top-0 z-10">
      <div className="navbar-start">
        {/* Mobile drawer toggle */}
        <div className="lg:hidden">
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>

        {/* Logo replaced with icon */}
        <Link
          to="/"
          className="btn btn-ghost text-xl pl-0 flex items-center gap-2"
        >
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
          <span className="font-semibold">Virtual Diary</span>
        </Link>
      </div>

      {/* Center nav links */}
      <div className="navbar-center hidden flex-none lg:block">
        <ul className="menu menu-horizontal">
          <NavLinks />
        </ul>
      </div>

      {/* Right side: search + theme + profile */}
      <div className="navbar-end gap-2">
        <div className="hidden md:flex">
          <SearchBox />
        </div>
        <ThemeController />
        <NavProfile />
      </div>
    </div>
  );
};

export default Navbar;
