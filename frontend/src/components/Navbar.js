import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Profile } from "../images/user.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">IDB</NavLink>
      <div className="navbarRight">
        <button>Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
