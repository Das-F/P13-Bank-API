import "./Sign-in.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer/Footer";
import loginApi from "../../api/Login";

function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const rememberInput = document.getElementById("remember-me");
    const username = usernameInput ? usernameInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";
    const remember = rememberInput ? rememberInput.checked : false;

    if (!username || !password) {
      setError("Veuillez renseigner le nom d'utilisateur et le mot de passe.");
      return;
    }

    try {
      const res = await loginApi(username, password);
      if (!res.ok) {
        // try to parse error message
        const err = await res.json().catch(() => null);
        const msg = (err && (err.message || err.error || JSON.stringify(err))) || `Erreur ${res.status}`;
        setError(msg);
        return;
      }

      const data = await res.json().catch(() => ({}));
      // support different backend shapes: { body: { token } } or { token }
      const token = data?.body?.token || data?.token || data?.tokenId || data;

      if (!token) {
        setError("Réponse invalide du serveur : token manquant.");
        return;
      }

      try {
        if (remember) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("username", username);
        } else {
          sessionStorage.setItem("authToken", token);
          sessionStorage.setItem("username", username);
        }
      } catch (err) {
        // ignore storage errors but notify
        console.warn("Storage error:", err);
      }

      navigate("/sign-in/user");
    } catch (err) {
      console.error(err);
      // Afficher le message d'erreur détaillé si fourni par la fonction d'API
      setError(err && err.message ? err.message : "Impossible de contacter le serveur de connexion.");
    }
  };

  return (
    <>
      <Header />
      <div className="sign-in-background">
        {error && (
          <p className="sign-in-error" style={{ color: "#b00020", textAlign: "center" }}>
            {error}
          </p>
        )}
        <LoginForm handleSubmit={handleSubmit} />
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
