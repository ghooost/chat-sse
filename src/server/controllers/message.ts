import { Request, Response } from "express";

import { sendMessage } from "../utils";

import { registerMessage } from "@services/messages";
import { getAllMetaDatas, pingUser } from "@services/users";
import { Message } from "@shared/messages";

export const messageController = (req: Request, res: Response) => {
  const body = req.body.message;
  const userId = parseInt(req.body.userId);
  if (!pingUser(userId)) {
    res.sendStatus(404);
    return;
  }
  console.log(`Message from ${userId}`);
  const messageToSend: Message = {
    mode: "message",
    message: registerMessage(userId, body),
  };
  for (const { connection } of getAllMetaDatas()) {
    sendMessage(connection, messageToSend);
  }
  res.sendStatus(200);
};
