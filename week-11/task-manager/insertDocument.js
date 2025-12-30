const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const dbName = "taskManager";

// Buat ObjectId baru dan tampilkan informasinya
const id = new ObjectId();
console.log("Generated ObjectId:", id.toHexString());
console.log("Hex length:", id.toHexString().length);
console.log("Timestamp:", id.getTimestamp());
console.log("Raw bytes length:", id.id.length);

async function main() {
  try {
    await client.connect();
    console.log("Berhasil terhubung ke database");

    const db = client.db(dbName);
    const users = db.collection("user");
    const tasks = db.collection("task");

    // Insert a single user document
    const { insertedId: userId } = await users.insertOne({
      _id: id,
      nama: "Dzaki",
      usia: 21,
    });

    console.log("User dimasukkan dengan _id:", userId);

    // Insert multiple tasks
    const tasksResult = await tasks.insertMany([
      { deskripsi: "mengerjakan tugas pemrograman jaringan", status: false },
      { deskripsi: "memasak nasi", status: true },
      { deskripsi: "membaca buku", status: true },
    ]);

    console.log("Tasks inserted:", tasksResult.insertedCount);

    return "Data selesai dimasukkan";
  } catch (error) {
    console.error("Error memasukkan document:", error);
    throw error;
  } finally {
    await client.close();
  }
}

main().then(console.log).catch(console.error);
