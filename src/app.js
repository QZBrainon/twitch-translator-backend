const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const tmi = require("tmi.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const APP_PORT = process.env.PORT || 3001;

app.get("/", (_, res) => res.json({ ok: "app running" }));

server.listen(APP_PORT, () => console.log(`App listening on port ${APP_PORT}`));

let messages = [];

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    messages.push(message);
    console.log("Received: %s", message);

    const parsedMessage = JSON.parse(message);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });

  ws.send(JSON.stringify(messages));
});

app.post("/startConnection", (req, res) => {
  try {
    const { streamerChannelName } = req.body;
    const client = new tmi.Client({
      channels: [streamerChannelName],
    });

    client.connect();

    client.on("message", (channel, tags, message, self) => {
      if (self) return;

      const data = {
        channel,
        tags,
        message: `${tags["display-name"]}: ${message}`,
      };

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    });

    return res.status(200).json({ status: "connected" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
