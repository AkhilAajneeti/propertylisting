import api from "./axiosConfig";

export const getTestimonials = async () => {
  let allTestimonials = [];
  let url = "/testimonials/";

  while (url) {
    const response = await api.get(url);

    const data = response.data;
    const results = data.results || data || [];

    allTestimonials = [...allTestimonials, ...results];

    url = data.next || null;
  }

  return allTestimonials;
};