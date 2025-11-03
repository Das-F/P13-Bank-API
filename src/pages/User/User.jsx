import "./User.css";
import Header from "../../components/Header/Header";
import EditName from "../../components/EditName/Edit-name";
import AccountList from "../../components/Account/AccountList";
import Footer from "../../components/Footer/Footer";

function User() {
  return (
    <>
      <Header />
      <div className="background">
        <EditName />
        <AccountList />
      </div>
      <Footer />
    </>
  );
}

export default User;
