import api from "./axiosConfig";

export const getCareerTestimonials = async () => {
  let allResults = [];
  let url = "/employee-testimonials/";

  try {
    while (url) {
      const res = await api.get(url);
      const data = res.data;

      const results = Array.isArray(data)
        ? data
        : data?.results || [];

      allResults = [...allResults, ...results];

      url = data?.next || null;
    }

    return allResults;
  } catch (error) {
    console.error("Error fetching career testimonials:", error);
    return allResults;
  }
};