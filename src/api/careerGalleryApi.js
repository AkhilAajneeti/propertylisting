import api from "./axiosConfig";

export const getGallery = async () => {
  let allImages = [];
  let url = "/office-gallery-images";

  while (url) {
    const res = await api.get(url);

    const data = res.data;
    const results = data?.results || data || [];

    allImages = [...allImages, ...results];

    url = data?.next || null;
  }

  return allImages;
};