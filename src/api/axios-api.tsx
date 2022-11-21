import axios from "axios";

const BASE_GET_URL = "https://dev-auth.wemission.community";
const BASE_POST_URL = "https://dev-auth.wemission.community/v1/api";
const HEADERS = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const apiGet = (url: string) => {
  return axios.get(`${BASE_GET_URL}${url}`, HEADERS);
};

export const apiPost = (url: string, data: any) => {
  return axios.post(`${BASE_POST_URL}${url}`, data, HEADERS);
};
