import api from "./axiosConfig";

export const getGallery = async () => {
  const res = await api.get("/office-gallery-images");
  return res.data?.results || [];
};
