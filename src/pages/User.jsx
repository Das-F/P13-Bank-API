import "../styles/User.css";
import { Link } from "react-router-dom";
import HeaderSignOut from "../components/Header-sign-out";
import Footer from "../components/Footer";
import EditName from "../components/Edit-name";

const username = "User";

function User() {
  return (
    <>
      <HeaderSignOut />
      <div className="background">
        <div className="user-page">
          <h1>
            Welcome back
            <br />
            {username} !
          </h1>
        </div>
        <div className="edit-name-container">
          <button className="edit-button">Edit Name</button>
          <EditName />
        </div>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <h3 className="account-amount-description">Available Balance</h3>
          </div>
          <div className="account-content-wrapper-cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default User;
