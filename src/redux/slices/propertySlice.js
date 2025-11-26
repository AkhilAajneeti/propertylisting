import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://192.168.1.60:8000/api/projects/";

// fetch products
export const fetchProjects = createAsyncThunk("projects/fetchAll", async () => {
  const response = await axios.get(BASE_URL);
  console.log(response.data.results);
  return response.data.results;
});

// create slices
const projectSlice  = createSlice({
  name: "projects",
  initialState: {
    items: [],
    status: "ideal",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default projectSlice .reducer;
