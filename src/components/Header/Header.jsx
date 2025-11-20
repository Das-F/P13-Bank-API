import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/img/argentBankLogo.png";
import userIcon from "../../assets/img/circle-user-solid-full.svg";
import logoutIcon from "../../assets/img/sign-out-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { clearProfile } from "../../redux/profileSlice";
import { clearAuth } from "../../redux/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth?.token);
  const username = useSelector((state) => state.auth?.username) || "";
  const isAuthenticated = Boolean(token);

  const handleSignOut = () => {
    try {
      dispatch(clearProfile());
      dispatch(clearAuth());
    } catch (e) {
      // ignore
    }
    navigate("/sign-in");
  };

  if (!isAuthenticated) {
    return (
      <nav className="nav">
        <div className="nav-container">
          <Link className="nav-logo" to="/">
            <img className="nav-logo-image" src={logo} alt="Argent Bank Logo" />
          </Link>
          <div className="nav-sign-in">
            <img className="nav-user-icon" src={userIcon} alt="User Icon" />
            <Link className="nav-link" to="/sign-in">
              <h3>Sign In</h3>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  const displayName = profile?.firstName && profile?.lastName ? `${profile.firstName} ${profile.lastName}` : profile?.firstName || username || "User";

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <img className="nav-logo-image" src={logo} alt="Argent Bank Logo" />
        </div>
        <div className="nav-sign-out">
          <img className="nav-icon" src={userIcon} alt="User Icon" />
          <h3 className="nav-username">{displayName}</h3>
          <img className="nav-icon" src={logoutIcon} alt="Logout Icon" />
          <button className="nav-link" onClick={handleSignOut}>
            <h3>Sign Out</h3>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
