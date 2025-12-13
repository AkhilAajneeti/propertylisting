import api from "./axiosConfig";

export const getTeamMembers = async () => {
  // const response = await api.get("/team-members/");
  // return response.data.results || [];
  let allResults = [];
  let nextUrl = "/team-members/";

  while (nextUrl) {
    const response = await api.get(nextUrl);
    allResults = [...allResults, ...response.data.results];
    nextUrl = response.data.next
      ? response.data.next.replace("https://jenikaventures.com/api", "")
      : null;
  }

  return allResults;
};
