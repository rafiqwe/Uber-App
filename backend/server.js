const http = require("http");
const app = require("./app");
const port = process.env.PORT;
const connectDb = require("./db/db");
const { initializeSocket } = require("./socket"); // <-- Import

connectDb();
const server = http.createServer(app);

initializeSocket(server); // <-- Initialize socket.io

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
