import api from "./axiosConfig";

export const getJobs = async () => {
  const response = await api.get("/job-postings/");
  return response.data.results || response.data || [];
};

// If you have Job Details Page later, already ready👇
export const getJobById = async (id) => {
  const response = await api.get(`/job-postings/${id}/`);
  return response.data;
};

//submit job application
export const submitJobApplication = async (formData) => {
  return await api.post("/job-applications/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};