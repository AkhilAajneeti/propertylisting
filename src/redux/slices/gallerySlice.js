import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGallery } from "../../api/careerGalleryApi";

export const fetchGallery = createAsyncThunk(
  "gallery/fetchGallery",
  async () => {
    const data = await getGallery();
    return data;
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gallerySlice.reducer;
