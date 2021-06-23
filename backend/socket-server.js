const http = require("http");
const debug = require("debug")("node-angular");

let server = null,
  io = null,
  connections = null;

module.exports = function (app = null, port = null) {
  if (!app || !port) {
    return {
      io,
      connections,
    };
  }

  const onError = (error) => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  const onListening = () => {
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    debug("Listening on " + bind);
  };

  if (!server) {
    server = http.createServer(app);
    server.on("error", onError);
    server.on("listening", onListening);
    server.listen(port);
  }

  if (!io) {
    io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET, POST, PATCH, DELETE, OPTIONS, PUT"],
      },
    });

    connections = {};

    io.sockets.on("connection", function (socket) {
      socket.on("join", function (data) {
        connections[data.email] = socket.id;
        socket.join(data.email);
      });
    });
  }

  return {
    io,
    connections,
  };
};
