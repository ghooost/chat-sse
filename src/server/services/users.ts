import { Response } from "express";

import { UserId } from "@shared/messages";

const CHECK_USER_TIMEOUT = 300000;

interface UserMeta {
  ping: number;
  connection: Response;
}

const PING_TIMEOUT = 600000;

let curUserId = 0;
let activeUserCheckTimerId: NodeJS.Timeout | undefined = undefined;
const allUsers: Map<number, UserMeta> = new Map();

export const registerUser = (connection: Response) => {
  const id = ++curUserId;
  allUsers.set(id, {
    connection,
    ping: Date.now(),
  });
  return id;
};

export const pingUser = (userId: UserId) => {
  const data = allUsers.get(userId);
  if (!data) {
    return false;
  }
  allUsers.set(userId, {
    ...data,
    ping: Date.now(),
  });
  return true;
};

export const getAllMetaDatas = () => allUsers.values();

export const isValidUser = (userId: UserId) => allUsers.has(userId);

const disconnectInactiveUsers = () => {
  const time = Date.now() - PING_TIMEOUT;
  allUsers.forEach(({ ping }, userId) => {
    if (ping < time) {
      console.log(`Disconnect inactive user ${userId}`);
      allUsers.delete(userId);
    }
  });
};

export const startActiveUserCheck = () => {
  if (activeUserCheckTimerId) {
    return;
  }
  activeUserCheckTimerId = setInterval(() => {
    console.log("check users");
    disconnectInactiveUsers();
    if (allUsers.size <= 0) {
      clearInterval(activeUserCheckTimerId);
    }
  }, CHECK_USER_TIMEOUT);
};
