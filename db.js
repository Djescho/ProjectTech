const { MongoClient } = require('mongodb');

// Deze functie geeft alle constante mee die de crud functies nodig hebben om verbinding te krijgen met de database
async function startDatabase() {
  const url = process.env.DATABASEKEY;
  const client = new MongoClient(url);
  // eerst verbinding maken met de server voordat de crud opdracht wordt uitgevoerd.
  await client.connect();
  const db = client.db('musicmatch');
  const col = db.collection('test');
  return col;
}
// create user
async function createUser(userProfile) {
  const db = await startDatabase();
  const p = await db.insertOne(userProfile);
}
// read user
async function getUser(searchQuery) {
  const db = await startDatabase();
  const p = await db.findOne({ name: searchQuery });
  return p;
}
// update user
async function updateUser(newData) {
  const db = await startDatabase();
  const p = await db.updateOne({ name: newData.name }, { $set: newData });
}
// delete user
async function deleteUser(newData) {
  const db = await startDatabase();
  const p = await db.deleteOne({ name: newData.name });
}
// exporteer alle functies zodat ze in het server.js bestand gebruikt kunnen worden.
module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
