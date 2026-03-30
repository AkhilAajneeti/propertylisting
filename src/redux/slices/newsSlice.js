import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNews, getNewsById, getNewsBySlug } from "../../api/newsApi";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async () => {
    const response = await getNews();
    return response.results || response;
  }
);

export const fetchNewsById = createAsyncThunk(
  "news/fetchNewsById",
  async ({ id }) => {
    const response = await getNewsById(id);
    return response;
  }
);
export const fetchNewsBySlug = createAsyncThunk(
  "news/fetchNewsBySlug",
  async ({ newsslug }) => {
    const response = await getNewsBySlug(newsslug);
    return response;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    data: [],
    currentNews: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Single News
      .addCase(fetchNewsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNews = action.payload;
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchNewsBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNews = action.payload;
      })
      .addCase(fetchNewsBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
