import "../styles/Header-sign-out.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";
import icon from "../assets/img/circle-user-solid-full.svg";
import logoutIcon from "../assets/img/sign-out-icon.svg";

function HeaderSignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Nettoyage basique du token si existant (localStorage/sessionStorage)
    try {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      localStorage.setItem("logout-event", Date.now());
    } catch (e) {
      // si l'accès au storage échoue, on ignore silencieusement
    }
    navigate("/sign-in");
  };

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
          <button className="nav-link" onClick={handleSignOut}>
            <h3>Sign Out</h3>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default HeaderSignOut;
