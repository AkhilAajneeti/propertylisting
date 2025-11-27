import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBlogs } from "../../api/blogApi";
import { getBlogById } from "../../api/blogApi";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const data = await getBlogs();
  return Array.isArray(data) ? data : data.results || [];
});

export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id) => {
    const res = await getBlogById(id);
    return res;
  }
);


const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    data: [],
    blogDetail: null,
    loading: false,
    error: null,
  },
  
  reducers: {
    clearBlogDetail: (state) => {
      state.blogDetail = null; // Reset when switching posts
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || []; 
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

       // Fetch single blog for detail page
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.blogDetail = null; // Clear previous blog
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.blogDetail = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
