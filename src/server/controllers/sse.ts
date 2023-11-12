import { Request, Response } from "express";

import { sendMessage } from "../utils";

import { getHistory } from "@services/messages";
import { registerUser, startActiveUserCheck } from "@services/users";

export const sseController = (_: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const userId = registerUser(res);
  startActiveUserCheck();

  console.log(`Connected ${userId}`);
  sendMessage(res, {
    mode: "connect",
    userId,
    messages: getHistory(),
  });
};
