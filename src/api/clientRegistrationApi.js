import api from "./axiosConfig";

// Backend base URL is read from VITE_BACKEND_API (already ends with /api).
// All routes below are relative to that base.

export const createClientRegistration = (data) =>
  api.post("/client-registrations/", data);

export const initiateYesBankPayment = (id) =>
  api.post(`/client-registrations/${id}/initiate-payment/`);

export const getClientRegistration = (id) =>
  api.get(`/client-registrations/${id}/`);
