import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProjects, getProjectsById, getProjectsBySlug } from "../../api/projectApi";
import { getSearhedProjects } from "../../api/searchApi";

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
  async ({ id }) => {
    const res = await getProjectsById(id);
    return res;
  }
);
export const fetchProjectBySlug = createAsyncThunk(
  "projects/fetchProjectBySlug",
  async ({ project_slug }) => {
    const res = await getProjectsBySlug(project_slug);
    return res;
  }
);
export const fetchSearchProjects = createAsyncThunk(
  "projects/fetchSearchProjects",
  async (query) => {
    const res = await getSearhedProjects(query);
    return res;
  }
);

const propertySlice = createSlice({
  name: "projects",
  initialState: {
    data: [],
    currentProject: null,
    searchResults: [],
    loading: false,
    projectsError: null,
    currentProjectError: null,
    searchError: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.projectsError = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload)
          ? action.payload
          : action.payload.results || [];
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.projectsError = action.error.message;
      })
      // Single Project
      // .addCase(fetchProjectById.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(fetchProjectById.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.currentProject = action.payload;
      // })
      // .addCase(fetchProjectById.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
      .addCase(fetchProjectBySlug.pending, (state) => {
        state.loading = true;
        state.currentProjectError= null;
      })
      .addCase(fetchProjectBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectBySlug.rejected, (state, action) => {
        state.loading = false;
        state.currentProjectError = action.error.message;
      })
      //seaqrchedProject
      .addCase(fetchSearchProjects.pending, (state) => {
        state.loading = true;
        state.searchError = null;
      })
      .addCase(fetchSearchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchProjects.rejected, (state, action) => {
        state.loading = false;
        state.searchError = action.error.message;
      });
  },
});

export default propertySlice.reducer;
