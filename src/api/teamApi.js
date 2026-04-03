import api from "./axiosConfig";

export const getTeamMembers = async () => {
  let allResults = [];
  let url = "/team-members/";

  try {
    while (url) {
      const response = await api.get(url);
      const data = response.data;

      // handle both paginated & non-paginated
      const results = Array.isArray(data)
        ? data
        : data?.results || [];

      allResults = [...allResults, ...results];

      // move to next page
      url = data?.next || null;
    }

    return allResults;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return allResults;
  }
};
