const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const { MONGODB_URL: url } = process.env;
const client = new MongoClient(url);
const dbName = "taskManager";

async function main() {
  try {
    await client.connect();
    console.log("Berhasil terhubung ke database");

    const db = client.db(dbName);
    const users = db.collection("user");

    // update user dengan nama "Dzaki" menjadi "Dzaki Sultan Rabbani"
    const filter = { nama: "Dzaki" };
    const updateDoc = {
      $set: {
        nama: "Dzaki Sultan Rabbani",
      },
    };

    const result = await users.updateOne(filter, updateDoc);
    console.log(
      `${result.matchedCount} document sesuai dengan filter, mengupdate document ${result.modifiedCount}`
    );
  } catch (error) {
    console.error("Error memperbarui document:", error);
  }
}

main()
  .catch(console.error)
  .finally(() => client.close());
