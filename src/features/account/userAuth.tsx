import { apiPost, apiGet } from "../../api/axios-api";

export const authUser = (email: string, password: string) => {
  return apiPost("/auth/login", {
    Email: email,
    Password: password,
  });
};

export const authHealthCheck = () => {
  return apiGet("/health");
};
