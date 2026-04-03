import api from "./axiosConfig";

export const getNews = async () => {
  let allNews = [];
  let url = "/news";

  while (url) {
    const response = await api.get(url);

    const data = response.data;
    const results = data.results || data || [];

    allNews = [...allNews, ...results];

    url = data.next || null;
  }

  return allNews;
};

export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}/`);
  return response.data;
};
export const getNewsBySlug = async (newsslug) => {
  const response = await api.get(`/news/${newsslug}/`);
  return response.data;
};