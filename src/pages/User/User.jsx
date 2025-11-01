import "./User.css";
import HeaderSignOut from "../../components/Header/Header-sign-out";
import EditName from "../../components/EditName/Edit-name";
import Footer from "../../components/Footer/Footer";

function User() {
  return (
    <>
      <HeaderSignOut />
      <div className="background">
        <EditName />
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
