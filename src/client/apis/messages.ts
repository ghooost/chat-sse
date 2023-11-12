import axios from "axios";

import { UserId } from "@shared/messages";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export const postPing = async (userId: UserId) => {
  const response = await api.get(`/ping/${userId}`);
  return response.status;
};

export const postMessage = async (userId: UserId, message: string) => {
  await api.post(`/message`, JSON.stringify({ userId, message }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return true;
};
