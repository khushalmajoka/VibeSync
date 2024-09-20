const express = require("express");
const cors = require("cors");
const roomRoutes = require("./routes/roomRoutes");
const roomSocket = require("./sockets/roomSocket");
const socketio = require("socket.io");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(cors());

app.use("/api", roomRoutes);

const server = app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  },
});

roomSocket(io);
