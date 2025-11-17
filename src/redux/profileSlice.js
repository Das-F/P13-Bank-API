import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Module Redux pour la gestion du profil utilisateur.
 *
 * Fournit une action asynchrone pour mettre à jour le profil côté serveur
 * et des reducers pour définir / effacer le profil localement.
 *
 * @module profileSlice
 */

/**
 * Profil utilisateur.
 * @typedef {Object} Profile
 * @property {string} firstName - Prénom de l'utilisateur
 * @property {string} lastName - Nom de famille de l'utilisateur
 */

// Lit `profileInfos` enregistrées dans le stockage local ou de session (si présentes).
/**
 * Lit `profileInfos` depuis `localStorage` ou `sessionStorage`.
 * Si la clé est absente ou qu'une erreur survient, retourne un objet vide par défaut.
 *
 * @returns {Profile} L'objet profil ({ firstName, lastName }).
 */
function readStoredProfile() {
  try {
    const stored = localStorage.getItem("profileInfos") || sessionStorage.getItem("profileInfos");
    return stored ? JSON.parse(stored) : { firstName: "", lastName: "" };
  } catch (e) {
    return { firstName: "", lastName: "" };
  }
}

const initialProfile = readStoredProfile();

/**
 * Action asynchrone (thunk) pour mettre à jour le profil utilisateur.
 *
 * Cette fonction crée un thunk via `createAsyncThunk` et encapsule la
 * logique asynchrone de mise à jour du profil : récupération du jeton
 * d'authentification, envoi d'une requête PUT au serveur, gestion des
 * erreurs et enregistrement des informations de profil dans le stockage
 * local ou de session selon l'emplacement du jeton.
 *
 * Comportement résumé :
 * - Si aucun jeton d'authentification n'est trouvé, la fonction résout
 *   immédiatement avec le `payload` (mise à jour locale seulement).
 * - Si un jeton est présent, elle effectue une requête PUT vers
 *   `/api/v1/user/profile` et retourne le profil mis à jour.
 * - En cas d'erreur réseau ou de réponse non OK, elle rejette via
 *   `rejectWithValue` avec l'erreur retournée.
 *
 * @param {{ firstName?: string, lastName?: string }} payload - Données de mise à jour du profil.
 * @returns {Promise<Profile>} Profil mis à jour en cas de succès.
 * @throws Rejet avec `rejectWithValue` en cas d'erreur réseau ou réponse non OK.
 */
export const updateProfile = createAsyncThunk("profile/updateProfile", async (payload, { rejectWithValue }) => {
  // try to get token
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  if (!token) {
    // Pas de token : résoudre localement (sera quand même enregistré dans le stockage)
    return payload;
  }

  try {
    const res = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      return rejectWithValue(err || res.status);
    }

    // backend may return updated profile, but use payload as authoritative fallback
    const data = await res.json().catch(() => null);
    const firstName = (data && (data.firstName || data.body?.firstName)) || payload.firstName || "";
    const lastName = (data && (data.lastName || data.body?.lastName)) || payload.lastName || "";

    // Enregistre dans le même stockage que le token
    const useLocal = !!localStorage.getItem("authToken");
    const storage = useLocal ? localStorage : sessionStorage;
    try {
      storage.setItem("profileInfos", JSON.stringify({ firstName, lastName }));
    } catch (e) {
      // ignorer les erreurs de stockage
    }

    return { firstName, lastName };
  } catch (e) {
    return rejectWithValue(e.message || e);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    firstName: initialProfile.firstName || "",
    lastName: initialProfile.lastName || "",
    status: "idle",
    error: null,
  },
  reducers: {
    setProfile(state, action) {
      state.firstName = action.payload.firstName || "";
      state.lastName = action.payload.lastName || "";
      // enregistre dans le stockage (préférer local si le token y est stocké)
      try {
        const useLocal = !!localStorage.getItem("authToken");
        const storage = useLocal ? localStorage : sessionStorage;
        storage.setItem("profileInfos", JSON.stringify({ firstName: state.firstName, lastName: state.lastName }));
      } catch (e) {
        // ignorer les erreurs de stockage
      }
    },
    clearProfile(state) {
      state.firstName = "";
      state.lastName = "";
      try {
        localStorage.removeItem("profileInfos");
        sessionStorage.removeItem("profileInfos");
      } catch (e) {
        // ignore
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.firstName = action.payload.firstName || "";
        state.lastName = action.payload.lastName || "";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error;
      });
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
