import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCareerTestimonials } from "../../api/careerTestimonialApi";

export const fetchCareerTestimonials = createAsyncThunk(
  "careerTestimonials/fetchCareerTestimonials",
  async () => {
    const data = await getCareerTestimonials();
    return data;
  }
);

const careerTestimonialsSlice = createSlice({
  name: "careerTestimonials",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareerTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCareerTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCareerTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default careerTestimonialsSlice.reducer;
