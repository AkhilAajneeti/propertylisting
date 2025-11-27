import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProjects, getProjectsById } from "../../api/projectApi";

// Async Thunk for API call
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const data = await getProjects();
    return data;
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async ({ id}) => {
    const res = await getProjectsById(id);
    return res;
  }
); 

const propertySlice = createSlice({
  name: "projects",
  initialState: {
    data: [],
    currentProject: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
         state.data = Array.isArray(action.payload)
          ? action.payload
          : action.payload.results || [];
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
       // Single Project
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default propertySlice.reducer;
