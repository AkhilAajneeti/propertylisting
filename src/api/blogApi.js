import api from "./axiosConfig";

export const getBlogs = async () => {
  let allBlogs = [];
  let url = "/blogs/";

  while (url) {
    const response = await api.get(url);

    const data = response.data;
    const results = data.results || data || [];

    allBlogs = [...allBlogs, ...results];

    url = data.next || null;
  }

  return allBlogs;
};


export const getBlogById = async (id) => {
  const response = await api.get(`/blogs/${id}/`);
  return response.data;
};
export const getBlogBySLug = async (blogslug) => {
  const response = await api.get(`/blogs/${blogslug}/`);
  return response.data;
};