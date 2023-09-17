import { Request, Response } from "express";

import { pingUser } from "@services/users";

export const pingController = (req: Request, res: Response) => {
  const userId = req.params.userId;
  console.log(`Ping from ${userId}`);
  if (!pingUser(userId)) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(200);
};
