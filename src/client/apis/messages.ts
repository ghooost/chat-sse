import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export const postPing = async (userId: string) => {
  await api.get(`/ping/${userId}`);
  return true;
};

export const postMessage = async (userId: string, message: string) => {
  await api.post(`/message`, JSON.stringify({ userId, message }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return true;
};
