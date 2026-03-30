import api from "./axiosConfig";

export const submitProjectEnquiry = async (project_slug, formData) => {
  const response = await api.post(`/projects/${project_slug}/enquiry/`, formData);
  return response;
};
