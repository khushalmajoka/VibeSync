const express = require("express");
const cors = require("cors");
const roomRoutes = require("./routes/roomRoutes");
const roomSocket = require("./sockets/roomSocket");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { client } = require("./redis");

const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", roomRoutes);

const server = app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});

const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});



client
  .connect()
  .then(() => {
    console.log("Connected to Redis Cloud");
  })
  .catch((err) => {
    console.error("Redis connection error:", err);
  });

roomSocket(io);
