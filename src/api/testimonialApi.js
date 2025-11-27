import api from "./axiosConfig";

export const getTestimonials = async () => {
  const response = await api.get("/testimonials/");
  return response.data.results || []; // list only
};
