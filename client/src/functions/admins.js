import axios from "axios";

export const verifyUser = async (userId) => {
  return axios.put(import.meta.env.VITE_API_URL + "/user/verify", { userId }, { withCredentials: true });
};

export const makeAdmin = async (userId) => {
  return axios.put(import.meta.env.VITE_API_URL + "/user/admin", { userId }, { withCredentials: true });
};

export const demoteAdmin = async (userId) => {
  return axios.put(import.meta.env.VITE_API_URL + "/user/demote", { userId }, { withCredentials: true });
};

export const deleteUser = async (userId) => {
  return axios.delete(import.meta.env.VITE_API_URL + "/user/" + userId, { withCredentials: true });
};
