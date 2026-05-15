import api from "./axiosConfig";

export const submitDoorstepInquiry = async (data) => {
  return await api.post("/doorstep-property-access/", data);
};
