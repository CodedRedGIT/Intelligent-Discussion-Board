import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserLogo from "../images/user.svg";
import HomeIcon from "../images/home.png";

const Navbar = () => {
  const history = useHistory();
  return (
    <nav className="navbar">
      {/* {<NavLink to="/dashboard">IDB</NavLink>} */}
      <Link to="/dashboard">
        <img
          src={HomeIcon}
          alt="HomeIcon"
          width="35"
          onClick={() => {
            history.push("/dashboard");
          }}
        />
      </Link>
      <div className="navbarRight">
        {/* {<img src={UserLogo} alt="UserLogo" width="40" />} */}
        <button
          onClick={() => {
            sessionStorage.removeItem("token-email");
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
