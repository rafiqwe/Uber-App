const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // Adjust as needed for security
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Listen for a specific event from the client
    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        const user = await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        const user = await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
        console.log(`Captain ${userId} joined room`);
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { captainId, location } = data;

      if (
        !location ||
        typeof location.lng !== "number" ||
        typeof location.ltd !== "number" ||
        location.lng < -180 ||
        location.lng > 180 ||
        location.lat < -90 ||
        location.lat > 90
      ) {
        socket.emit("error", { message: "Invalid location data" });
        return;
      }

      // ✅ Correct GeoJSON update
      const updatedCaptain = await captainModel.findByIdAndUpdate(
        captainId,
        {
          location: {
            type: "Point",
            coordinates: [location.lng, location.ltd],
          },
        },
        { new: true }
      );
    });

    // Optionally, handle custom events here
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, event, message) {
  if (io) {
    io.to(socketId).emit(event, message);
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
