import { MessageCallback } from "./messages";

interface UserMeta {
  ping?: number;
  callback?: MessageCallback;
}

const PING_TIMEOUT = 600000;

const allUsers: Record<string, UserMeta> = {};

const makeKeyGenerator = (min: number, max: number) => {
  let numberOfLoops = 0;
  let index = min - 1;

  return () => {
    index = index + 1;
    if (index > max) {
      index = min;
      numberOfLoops += 1;
    }
    return `${index}.${numberOfLoops}`;
  };
};

// take IDs from emoji codes range
const makeKey = makeKeyGenerator(128002, 128063);

export const createUser = () => {
  const id = makeKey();
  allUsers[id] = {
    ping: Date.now(),
  };
  return id;
};

export const pingUser = (userId: string) => {
  if (!Object.prototype.hasOwnProperty.call(allUsers, userId)) {
    return false;
  }
  allUsers[userId].ping = Date.now();
  return true;
};

export const isActiveUser = (userId: string) => {
  if (!Object.prototype.hasOwnProperty.call(allUsers, userId)) {
    return false;
  }
  return (allUsers[userId].ping || 0) > Date.now() - PING_TIMEOUT;
};
