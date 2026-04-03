import api from "./axiosConfig";


export const getProjects = async () => {
  let allProjects = [];
  let url = "/projects/";

  while (url) {
    const response = await api.get(url);
    allProjects = [...allProjects, ...response.data.results];
    url = response.data.next; // next page url
  }

  return allProjects;
};

export const getProjectsById = async (id) => {
  const response = await api.get(`/projects/${id}/`);
  return response.data;
};
export const getProjectsBySlug = async (project_slug) => {
  const response = await api.get(`/projects/${project_slug}/`);
  return response.data;
};
const getProjectsByCategory = async () => {
  const response = await api.get(`/property-categories/`);
  return response.data;
};

export default getProjectsByCategory