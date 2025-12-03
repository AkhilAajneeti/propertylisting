import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTeamMembers } from "../../api/teamApi";

export const fetchTeam = createAsyncThunk("team/fetchTeam", async () => {
  return await getTeamMembers();
});

const teamSlice = createSlice({
  name: "team",
  initialState: {
    members: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default teamSlice.reducer;
