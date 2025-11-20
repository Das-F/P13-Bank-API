import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateProfile = createAsyncThunk("profile/updateProfile", async (payload, { rejectWithValue, getState }) => {
  const token = getState().auth?.token;
  if (!token) {
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

    const data = await res.json().catch(() => null);
    const firstName = (data && (data.firstName || data.body?.firstName)) || payload.firstName || "";
    const lastName = (data && (data.lastName || data.body?.lastName)) || payload.lastName || "";

    return { firstName, lastName };
  } catch (e) {
    return rejectWithValue(e.message || e);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    firstName: "",
    lastName: "",
    status: "idle",
    error: null,
  },
  reducers: {
    setProfile(state, action) {
      state.firstName = action.payload.firstName || "";
      state.lastName = action.payload.lastName || "";
    },
    clearProfile(state) {
      state.firstName = "";
      state.lastName = "";
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
