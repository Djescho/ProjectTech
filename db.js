const { MongoClient } = require("mongodb");
async function startDatabase() {
  const url = process.env.DATABASEKEY;
  const client = new MongoClient(url);
  // eerst verbinding maken
  await client.connect();
  const db = client.db("musicmatch");
  const col = db.collection("test");
  return col;
}
async function createUser(userProfile) {
  const db = await startDatabase();
  const p = await db.insertOne(userProfile);
}
async function getUser(searchQuery) {
  const db = await startDatabase();
  const p = await db.findOne({ name: searchQuery });
  return p;
}

async function updateUser(newData) {
  const db = await startDatabase();
  const p = await db.updateOne({ name: newData.name }, { $set: newData });
}
async function deleteUser(newData) {
  const db = await startDatabase();
  const p = await db.deleteOne({ name: newData.name });
}

module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
