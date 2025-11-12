import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/img/argentBankLogo.png";
import userIcon from "../../assets/img/circle-user-solid-full.svg";
import logoutIcon from "../../assets/img/sign-out-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { clearProfile } from "../../redux/profileSlice";

function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("Username");
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      setIsAuthenticated(token);
      // optionally read a username from storage
      const storedName = localStorage.getItem("username") || sessionStorage.getItem("username");
      if (storedName) setUsername(storedName);
    };

    checkAuth();

    // Listen for logout events from other tabs
    const onStorage = (e) => {
      if (e.key === "logout-event" || e.key === "authToken" || e.key === "profileInfos") {
        checkAuth();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleSignOut = () => {
    try {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      // clear persisted profile
      localStorage.removeItem("profileInfos");
      sessionStorage.removeItem("profileInfos");
      dispatch(clearProfile());
      localStorage.removeItem("username");
      sessionStorage.removeItem("username");
      localStorage.setItem("logout-event", Date.now());
    } catch (e) {
      // ignore storage errors
    }
    setIsAuthenticated(false);
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
