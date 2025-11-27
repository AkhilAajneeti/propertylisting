import api from "./axiosConfig";

export const submitContactForm = async (data) => {
  return await api.post("/contact/", data);
};
