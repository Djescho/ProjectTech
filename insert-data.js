const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
require("dotenv").config();
const url = process.env.DATABASEKEY;
const client = new MongoClient(url);

// The database to use
const dbName = "musicmatch";

async function run() {
  //informatie over try catch https://nodejs.org/en/knowledge/errors/what-is-try-catch/

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection "people"
    const col = db.collection("users");

    // Construct a document
    let userProfile = {
      name: { first: "Djescho", last: "Mananga" },
      age: 22,
      gender: "man",
      songIDs: [1234, 2345, 7888],
      agePrefrence: { min: 21, max: 26 },
      sexPrefrence: "man",
      description:
        "a whole lot of nothing here. You know who I am, i'm everywhere and nowehre at the same time, who cool is that",
    };

    // Insert a single document, wait for promise so we can read it back
    // Insert data

    const p = await col.insertOne(userProfile);
    // Find one document
    // print The inserted data
    const myDoc = await col.findOne();
    // Print to the console
    console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
