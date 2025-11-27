import api from "./axiosConfig";

export const submitProjectEnquiry = async (projectId, formData) => {
  const response = await api.post(`/projects/${projectId}/enquiry/`, formData);
  return response;
};
