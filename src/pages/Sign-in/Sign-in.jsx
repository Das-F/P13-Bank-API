import "./Sign-in.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer/Footer";
import loginApi from "../../api/Login";
import { useDispatch } from "react-redux";
import { setProfile } from "../../redux/profileSlice";
import { setAuth } from "../../redux/authSlice";

function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

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

      // Store token/username in Redux (no local/sessionStorage)
      dispatch(setAuth({ token, username }));

      // After storing token in Redux, try to fetch the user's profile
      try {
        const profileRes = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const profileData = await profileRes.json().catch(() => ({}));
        const fetchedFirst = profileData?.body?.firstName || profileData?.firstName || profileData?.first_name;
        const fetchedLast = profileData?.body?.lastName || profileData?.lastName || profileData?.last_name;

        const profileInfos = {};
        if (fetchedFirst) profileInfos.firstName = fetchedFirst;
        if (fetchedLast) profileInfos.lastName = fetchedLast;

        if (Object.keys(profileInfos).length > 0) {
          dispatch(setProfile(profileInfos));
        }
      } catch (err) {
        // non-blocking: if profile fetch fails, we still navigate
        console.warn("Profile fetch failed:", err);
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
        <LoginForm handleSubmit={handleSubmit} error={error} />
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
