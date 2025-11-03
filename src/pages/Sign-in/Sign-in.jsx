import "./Sign-in.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer/Footer";

function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Read username and remember-me from the form and store an auth token + username
    const usernameInput = document.getElementById("username");
    const rememberInput = document.getElementById("remember-me");
    const username = usernameInput ? usernameInput.value.trim() : "";
    const remember = rememberInput ? rememberInput.checked : false;

    if (username) {
      const token = `token-${Date.now()}`;
      try {
        if (remember) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("username", username);
        } else {
          sessionStorage.setItem("authToken", token);
          sessionStorage.setItem("username", username);
        }
      } catch (e) {
        // ignore storage errors
      }
    }

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
