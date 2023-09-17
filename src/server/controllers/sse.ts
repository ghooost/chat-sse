import { Request, Response } from "express";

import { subscribeOnMessage, unsubscribeFromMessage } from "@services/messages";
import { createUser, isActiveUser } from "@services/users";
import { Message, MessageData } from "@shared/messages";

const CHECK_USER_TIMEOUT = 300000;

const sendEvent = (res: Response, data: Message) =>
  res.write(`data: ${JSON.stringify(data)}\n\n`);

export const sseController = (_: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const userId = createUser();
  console.log("Connected", userId);
  sendEvent(res, {
    mode: "connected",
    userId,
  });

  const cb = (message: MessageData) => {
    if (!res.writable) {
      unsubscribeFromMessage(cb);
      console.log("cant write, disconnect");
      return;
    }
    console.log(`Send SSE to ${userId}`);
    sendEvent(res, {
      ...message,
      mode: "message",
    });
  };
  subscribeOnMessage(cb);
  const timer = setInterval(() => {
    if (!isActiveUser(userId)) {
      unsubscribeFromMessage(cb);
      clearInterval(timer);
      console.log(`Disconnect user ${userId}`);
    }
  }, CHECK_USER_TIMEOUT);
};
