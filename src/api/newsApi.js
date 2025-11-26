import api from "./axiosConfig";

export const getNews = async () => {
  const response = await api.get("/news");
  return response.data.results || response.data || [];
};  


export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}/`);
  return response.data;
};