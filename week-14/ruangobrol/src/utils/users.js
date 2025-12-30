const users = [];

function tambahPengguna({ id, username, room }) {
  username = username ? username.trim() : "";
  room = room ? room.trim() : "";
  if (!username || !room) {
    return { error: "Username dan room harus diisi" };
  }
  const existingUser = users.find(
    (u) =>
      u.room === room && u.username.toLowerCase() === username.toLowerCase()
  );
  if (existingUser) {
    return { error: "Nama sudah digunakan di room ini" };
  }
  const user = { id, username, room };
  users.push(user);
  return { user };
}

function hapusPengguna(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
}

function ambilPengguna(id) {
  return users.find((u) => u.id === id);
}

function ambilPenggunaDariRoom(room) {
  return users.filter((u) => u.room === room);
}

// export both Indonesian and English-named functions for compatibility
module.exports = {
  tambahPengguna,
  hapusPengguna,
  ambilPengguna,
  ambilPenggunaDariRoom,
  addUser: (id, username, room) => tambahPengguna({ id, username, room }).user,
  removeUser: hapusPengguna,
  getCurrentUser: ambilPengguna,
  getRoomUsers: ambilPenggunaDariRoom,
};
