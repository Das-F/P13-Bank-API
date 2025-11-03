import "./Sign-in.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer/Footer";

function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/sign-in/user");
  };

  return (
    <>
      <Header />
      <div className="sign-in-background">
        <LoginForm handleSubmit={handleSubmit} />
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
