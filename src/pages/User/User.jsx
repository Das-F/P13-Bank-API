import "./User.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import EditName from "../../components/EditName/Edit-name";
import AccountList from "../../components/Account/AccountList";
import Footer from "../../components/Footer/Footer";

function User() {
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    if (!token) {
      // not authenticated -> redirect to sign-in
      navigate("/sign-in", { replace: true });
    }
  }, [navigate, token]);
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
