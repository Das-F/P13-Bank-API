import "../styles/Sign-in.css";
import { useNavigate } from "react-router-dom";
import HeaderSignIn from "../components/Header-sign-in";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/sign-in/user");
  };

  return (
    <>
      <HeaderSignIn />
      <div className="sign-in-background">
        <LoginForm handleSubmit={handleSubmit} />
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
