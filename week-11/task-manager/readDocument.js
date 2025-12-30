const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const dbName = "taskManager";

async function main() {
  try {
    await client.connect();
    console.log("Berhasil terhubung ke database");

    const db = client.db(dbName);
    const users = db.collection("user");

    // cari user dengan nama "Dzaki"
    const userName = "Dzaki";
    const user = await users.findOne({ nama: userName });

    // cari user berdasarkan _id tertentu
    const userId = new ObjectId("6953893609272a35fd5bdfe6");
    const userById = await users.findOne({ _id: userId });

    // cari user dengan usia kurang dari 25 dan tampilkan dalam bentuk array
    const youngUsers = await users.find({ usia: { $lt: 25 } }).toArray();

    // tampilkan semua hasil pencarian dengan if statement
    if (user && userById && youngUsers) {
      console.log("User ditemukan berdasarkan nama:", user);
      console.log("User ditemukan berdasarkan _id:", userById);
      console.log("Users dengan usia kurang dari 25:", youngUsers);
    } else {
      console.log("Salah satu atau lebih user tidak ditemukan.");
    }
  } catch (error) {
    console.error("Error membaca document:", error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
