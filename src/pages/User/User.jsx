import "./User.css";
import HeaderSignOut from "../../components/Header/Header-sign-out";
import EditName from "../../components/EditName/Edit-name";
import AccountSection from "../../components/AccountList/AccountList";
import Footer from "../../components/Footer/Footer";

function User() {
  return (
    <>
      <HeaderSignOut />
      <div className="background">
        <EditName />
        <AccountSection />
        <AccountSection />
        <AccountSection />
      </div>
      <Footer />
    </>
  );
}

export default User;
