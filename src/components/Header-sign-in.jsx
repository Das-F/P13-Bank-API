import "../styles/Header-sign-in.css";
import { Link } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";
import icon from "../assets/img/circle-user-solid-full.svg";

function HeaderSignIn() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <img className="nav-logo-image" src={logo} alt="Argent Bank Logo" />
        </div>
        <div className="nav-sign-in">
          <img className="nav-user-icon" src={icon} alt="User Icon" />
          <Link className="nav-link" to="./sign-in.html">
            <h3>Sign In</h3>
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default HeaderSignIn;
