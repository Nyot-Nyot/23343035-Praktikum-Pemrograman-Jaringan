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

    // hapus task dengan deskripsi "memasak nasi"
    const tasks = db.collection("task");
    const deleteResult = await tasks.deleteOne({ deskripsi: "memasak nasi" });

    if (deleteResult.deletedCount === 1) {
      console.log("Task berhasil dihapus.");
    } else {
      console.log("Tidak ada task yang dihapus.");
    }
  } catch (error) {
    console.error("Error menghapus document:", error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
