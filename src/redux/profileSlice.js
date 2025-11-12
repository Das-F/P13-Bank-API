import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Read persisted profileInfos from storage if present
function readStoredProfile() {
  try {
    const stored = localStorage.getItem("profileInfos") || sessionStorage.getItem("profileInfos");
    return stored ? JSON.parse(stored) : { firstName: "", lastName: "" };
  } catch (e) {
    return { firstName: "", lastName: "" };
  }
}

const initialProfile = readStoredProfile();

export const updateProfile = createAsyncThunk("profile/updateProfile", async (payload, { rejectWithValue }) => {
  // try to get token
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  if (!token) {
    // No token: resolve locally (will still persist to storage)
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

    // Persist in the same storage as the token
    const useLocal = !!localStorage.getItem("authToken");
    const storage = useLocal ? localStorage : sessionStorage;
    try {
      storage.setItem("profileInfos", JSON.stringify({ firstName, lastName }));
    } catch (e) {
      // ignore storage errors
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
      // persist to storage (prefer local if token stored there)
      try {
        const useLocal = !!localStorage.getItem("authToken");
        const storage = useLocal ? localStorage : sessionStorage;
        storage.setItem("profileInfos", JSON.stringify({ firstName: state.firstName, lastName: state.lastName }));
      } catch (e) {
        // ignore
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
