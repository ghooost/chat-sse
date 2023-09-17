import { MessageData } from "@shared/messages";

export type MessageCallback = (message: MessageData) => void;

let callbacks: MessageCallback[] = [];
let id = 0;

export const subscribeOnMessage = (callback: MessageCallback) => {
  callbacks.push(callback);
};
export const unsubscribeFromMessage = (callback: MessageCallback) => {
  callbacks = callbacks.filter((cb) => cb !== callback);
};
export const emitMessageEvent = (message: string, authorId: string) => {
  id += 1;
  const data = {
    id,
    message,
    authorId,
  };
  callbacks.forEach((cb) => cb(data));
};
