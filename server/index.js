const express = require("express");
const cors = require("cors");
const roomRoutes = require("./routes/roomRoutes");
const roomSocket = require("./sockets/roomSocket");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// const redis = require('redis');

// const client = redis.createClient({
//   password: process.env.REDIS_PASSWORD,
//   socket: {
//       host: process.env.REDIS_HOST,
//       port: process.env.REDIS_PORT
//   }
// });

// client.connect();

const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", roomRoutes);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log("Server running on port: " + PORT);
});

const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

roomSocket(io);
