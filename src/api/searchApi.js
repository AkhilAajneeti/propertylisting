import api from "./axiosConfig";


export const getSearhedProjects = async (query) => {
  const response = await api.get(`/projects/search/?q=${query}`);
  return response.data || [];
};

