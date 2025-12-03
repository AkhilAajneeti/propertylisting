import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/propertySlice";
import blogsReducer from "./slices/blogSlice"; // FIX
import newsReducer from "./slices/newsSlice";
import galleryReducer from "./slices/gallerySlice";
import careerTestimonialsReducer from "./slices/careerTestimonialsSlice";
import teamReducer from "./slices/teamSlice";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    blogs:blogsReducer,
    news: newsReducer,
    careerTestimonials: careerTestimonialsReducer,
    gallery: galleryReducer,
    team: teamReducer,
  },
});

export default store;
