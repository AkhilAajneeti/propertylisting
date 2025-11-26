import api from "./axiosConfig";

export const getBlogs = async () => {
  const response = await api.get("/blogs/");
  return response.data.results || [];
};


export const getBlogById = async (id) => {
  const response = await api.get(`/blogs/${id}/`);
  return response.data;
};