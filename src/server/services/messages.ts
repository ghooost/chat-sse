import { MessageData, UserId } from "@shared/messages";

let id = -1;
const MAX_HISTORY_LEN = 20;
const history: MessageData[] = [];

export const registerMessage = (authorId: UserId, body: string) => {
  id = id + 1;
  const messageData = {
    id,
    authorId,
    body,
  };
  history[id % MAX_HISTORY_LEN] = messageData;
  return messageData;
};

export const getHistory = () => {
  return history.slice(0, id + 1).concat(history.slice(id + 1));
};
