async function login(username, password) {
  // Petite instrumentation pour aider au debug côté client.
  console.debug("Login attempt for:", username);

  try {
    const res = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Le backend attend un champ 'email'
      body: JSON.stringify({ email: username, password }),
    });

    // Essayer de logger le corps de la réponse si possible (clone pour ne pas consommer le stream)
    try {
      const body = await res
        .clone()
        .json()
        .catch(() => null);
      console.debug("Login response status:", res.status, "body:", body);
    } catch (e) {
      console.debug("Unable to parse login response body", e);
    }

    return res;
  } catch (err) {
    // Erreur réseau (backend inaccessible, CORS bloquant, etc.)
    console.error("Network error during login request:", err);
    // Fournir une erreur descriptive au caller
    throw new Error("Erreur réseau lors de la connexion : " + (err.message || err));
  }
}

export default login;
