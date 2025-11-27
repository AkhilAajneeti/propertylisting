import api from "./axiosConfig";

export const getCareerTestimonials = async () => {
  const res = await api.get("/employee-testimonials/");
  return res.data.results;
};
