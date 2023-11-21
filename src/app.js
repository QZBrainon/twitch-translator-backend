import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import tmi from "tmi.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  },
});

let clientSocket;

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected");

  clientSocket = socket;
  console.log(clientSocket);
});

app.get("/", (_, res) => res.json({ ok: "app running" }));

app.post("/startConnection", (req, res) => {
  const { streamerChannelName } = req.body;
  const client = new tmi.Client({
    channels: [streamerChannelName],
  });

  client.connect();

  client.on("message", (channel, tags, message, self) => {
    console.log(`${tags["display-name"]}: ${message}`);
    if (channel.split("#")[1] === streamerChannelName) {
      const newMessage = { username: tags["display-name"], message };
      if (clientSocket) {
        clientSocket.emit("newMessage", newMessage); // Emite um evento quando uma nova mensagem é recebida para todos os clientes conectados
      }
    }
  });

  return res.status(200).json({ status: "connected" });
});

app.use(errorMiddleware);

export default app;
