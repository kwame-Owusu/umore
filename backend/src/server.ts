import express from "express";
import dotenv from "dotenv";
import type { Request, Response } from "express";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/ping", (_: Request, res: Response) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
