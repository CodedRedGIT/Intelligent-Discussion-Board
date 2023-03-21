import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserLogo from "../images/user.svg";

const Navbar = () => {
  const history = useHistory();
  return (
    <nav className="navbar">
      <NavLink to="/dashboard">IDB</NavLink>
      <div className="navbarRight">
        <img src={UserLogo} alt="UserLogo" width="40" />
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
