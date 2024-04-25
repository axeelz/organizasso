import axios from "axios";

export const verifyUser = async (userId) => {
  return axios
    .put(import.meta.env.VITE_API_URL + "/user/verify", { userId }, { withCredentials: true })
    .then(() => {
      console.log("Utilisateur vérifié");
    })
    .catch((err) => {
      console.error(err);
    });
};
