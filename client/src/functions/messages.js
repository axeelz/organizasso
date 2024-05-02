import axios from "axios";

export const deleteMessage = async (messageId) => {
  return axios.delete(`${import.meta.env.VITE_API_URL}/message/${messageId}`, { withCredentials: true });
};
