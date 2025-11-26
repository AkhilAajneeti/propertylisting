import api from "./axiosConfig";


export const getProjects = async () => {
  const response = await api.get("/projects/");
  return response.data.results || [];
};


export const getProjectsById = async (id) => {
  const response = await api.get(`/projects/${id}/`);
  return response.data;
};