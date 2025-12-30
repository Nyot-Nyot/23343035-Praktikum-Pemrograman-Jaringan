const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected as", socket.id);
  socket.emit("join", { username: "Tester", room: "uji" }, (error) => {
    if (error) return console.log("join error:", error);
    console.log("joined room");

    socket.emit("kirimPesan", "Halo dari test-client", (err) => {
      if (err) console.log("kirimPesan callback err:", err);
      else console.log("kirimPesan ack received");
    });
  });
});

socket.on("pesan", (m) => console.log("pesan:", m));
socket.on("roomData", (d) => console.log("roomData:", d));
socket.on("locationMessage", (m) => console.log("locationMessage:", m));

socket.on("disconnect", () => console.log("disconnected"));
