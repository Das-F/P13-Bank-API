import "../styles/Header-sign-out.css";
import { Link } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";
import icon from "../assets/img/circle-user-solid-full.svg";
import logoutIcon from "../assets/img/sign-out-icon.svg";

function HeaderSignOut() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <img className="nav-logo-image" src={logo} alt="Argent Bank Logo" />
        </div>
        <div className="nav-sign-out">
          <img className="nav-icon" src={icon} alt="User Icon" />
          <h3 className="nav-username">Username</h3>
          <img className="nav-icon" src={logoutIcon} alt="Logout Icon" />
          <Link className="nav-link" to="./sign-in.html">
            <h3>Sign Out</h3>
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default HeaderSignOut;
