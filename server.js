console.log("Hello world, lets spin the server up shall we?");
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const { MongoClient } = require("mongodb");

require("dotenv").config();

// const db = require("./db");
// const dbName = "musicmatch";
// const collectionName = "test";

// db.initialize(
//   dbName,
//   collectionName,
//   function (dbCollection) {
//     // successCallback
//     // get all items
//     dbCollection.find().toArray(function (err, result) {
//       if (err) throw err;
//       console.log(result);
//     });

//     // << db CRUD routes >>
//   },
//   function (err) {
//     // failureCallback
//     throw err;
//   }
// );

app.set("view enigine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.get kiest wat je bij welke url te zien krijgt.

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/editprofile", (req, res) => {
  res.render("editprofile.ejs");
});
app.get("/newprofile", (req, res) => {
  res.render("newprofile.ejs");
});

//app.use laat weten welke mappen er middels urls toegangelijk zijn.

//Wanner er een nieuw profiel wordt aangemaakt

app.post("/newProfile", (req, res) => {
  console.log("Er is een nieuw profiel toegevoegd");
  let userProfile = req.body;
  console.log(userProfile);

  const url = process.env.DATABASEKEY;
  const client = new MongoClient(url);
  const dbName = "musicmatch";

  async function uploadData() {
    //informatie over try catch https://nodejs.org/en/knowledge/errors/what-is-try-catch/
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection("test");
      console.log("Connected correctly to server");

      const p = await col.insertOne(userProfile);
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  }

  uploadData().catch(console.dir);

  res.render("index.ejs", { data: userProfile });
});
app.post("/updateProfile", (req, res) => {
  console.log("er heeft een profielupdate plaats geveonden");
  res.render("index.ejs");
});
app.post("/login", (req, res) => {
  res.render("index.ejs");
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
  console.log(`BTapp listening at http://localhost:${port}`);
});
