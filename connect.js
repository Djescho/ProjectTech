const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
require("dotenv").config();
const url = process.env.DATABASEKEY;
const client = new MongoClient(url);

export async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

export let huis = {
  kamers: 6,
  bedden: 4,
};
