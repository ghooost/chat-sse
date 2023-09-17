import cors from "cors";
import express from "express";

import { messageController } from "@controllers/message";
import { pingController } from "@controllers/ping";
import { sseController } from "@controllers/sse";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/sse", sseController);
app.get("/ping/:userId", pingController);
app.post("/message", messageController);

app.listen(process.env.VITE_SERVER_PORT, () => {
  console.log(`Server at ${process.env.VITE_SERVER_PORT}`);
});
