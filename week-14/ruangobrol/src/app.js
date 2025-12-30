const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");
const {
  tambahPengguna,
  hapusPengguna,
  ambilPengguna,
  ambilPenggunaDariRoom,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New WebSocket connection", socket.id);
  socket.onAny((event, ...args) => {
    console.log("socket event:", event, "args:", args);
  });

  socket.on("join", (options, callback) => {
    const { error, user } = tambahPengguna({ id: socket.id, ...options });
    if (error) {
      console.log("join error:", error);
      return callback(error);
    }

    socket.join(user.room);

    console.log("User joined:", user);

    socket.emit("pesan", generateMessage("Admin", "Selamat datang!"));
    socket.broadcast
      .to(user.room)
      .emit(
        "pesan",
        generateMessage("Admin", `${user.username} telah bergabung`)
      );
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: ambilPenggunaDariRoom(user.room),
    });

    callback();
  });

  socket.on("kirimPesan", (pesan, callback) => {
    const user = ambilPengguna(socket.id);
    console.log("kirimPesan from:", socket.id, "user:", user, "pesan:", pesan);
    const filter = new Filter();
    if (!user) {
      console.log("kirimPesan: user not found for socket", socket.id);
      return callback("User tidak ditemukan");
    }
    if (filter.isProfane(pesan)) {
      return callback("Pesan tidak boleh mengandung kata kasar");
    }
    io.to(user.room).emit("pesan", generateMessage(user.username, pesan));
    callback();
  });

  socket.on("kirimLokasi", (coords, callback) => {
    const user = ambilPengguna(socket.id);
    if (!user) {
      return callback("User tidak ditemukan");
    }
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = hapusPengguna(socket.id);
    if (user) {
      io.to(user.room).emit(
        "pesan",
        generateMessage("Admin", `${user.username} telah keluar`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: ambilPenggunaDariRoom(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
