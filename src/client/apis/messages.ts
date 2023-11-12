import axios from "axios";

import { UserId } from "@shared/messages";

export const NO_CONNECTION_ERROR = 0;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export const postPing = async (userId: UserId) => {
  const response = await api.get(`/ping/${userId}`);
  return response.status;
};

export const postMessage = async (userId: UserId, message: string) => {
  const response = await api.post(
    `/message`,
    JSON.stringify({ userId, message }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.status;
};
