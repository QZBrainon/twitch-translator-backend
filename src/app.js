import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import tmi from "tmi.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => res.json({ ok: "app running" }));

app.post("/startConnection", (req, res) => {
  const { streamerChannelName } = req.body;
  const client = new tmi.Client({
    channels: [streamerChannelName],
  });

  client.connect();

  client.on("message", (channel, tags, message, self) => {
    console.log(`${tags["display-name"]}: ${message}`);
  });

  return res.status(200).json({ status: "connected" });
});

app.use(errorMiddleware);

export default app;
