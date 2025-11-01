import "./User.css";
import HeaderSignOut from "../../components/Header/Header-sign-out";
import EditName from "../../components/EditName/Edit-name";
import AccountList from "../../components/Account/AccountList";
import Footer from "../../components/Footer/Footer";

function User() {
  return (
    <>
      <HeaderSignOut />
      <div className="background">
        <EditName />
        <AccountList />
      </div>
      <Footer />
    </>
  );
}

export default User;
