import api from "./axiosConfig";

export const getTeamMembers = async () => {
  const response = await api.get("/team-members/");
  return response.data.results || [];
};
