import { Response } from "express";

import { Message } from "@shared/messages";

export const sendMessage = (res: Response, data: Message) =>
  res.write(`data: ${JSON.stringify(data)}\n\n`);
