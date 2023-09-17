import { Request, Response } from "express";

import { emitMessageEvent } from "@services/messages";
import { pingUser } from "@services/users";

export const messageController = (req: Request, res: Response) => {
  const message = req.body.message;
  const userId = req.body.userId;
  if (!pingUser(userId)) {
    res.sendStatus(404);
    return;
  }
  emitMessageEvent(message, userId);
  res.sendStatus(200);
};
