console.log("Hello world, lets spin the server up shall we?");
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const dbConnetion = require("./db");
const { render } = require("ejs");
var logedinuser = "";
require("dotenv").config();

app.set("view enigine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.get kiest wat je bij welke url te zien krijgt.

app.get("/", (req, res) => {
  logedinuser = "";
  console.log(logedinuser);
  res.render("login.ejs");
});

app.get("/editprofile", async (req, res) => {
  console.log("data wordt opgehaald");
  let input = logedinuser;
  console.log(input);
  const loadedProfile = await dbConnetion.getUser(input);
  console.log(loadedProfile);
  res.render("editprofile.ejs", { data: loadedProfile });
});

app.get("/newprofile", (req, res) => {
  res.render("newprofile.ejs");
});

app.post("/newProfile", (req, res) => {
  console.log("Er is een nieuw profiel toegevoegd");

  let userProfile = req.body;
  console.log(userProfile);
  dbConnetion.createUser(userProfile);
  logedinuser = userProfile.name;
  res.render("index.ejs", { data: userProfile });
});

app.post("/login", async (req, res) => {
  console.log("er wordt ingelogd");
  let input = req.body.inlognaam;
  console.log(input);
  const loadedProfile = await dbConnetion.getUser(input);
  console.log(loadedProfile);
  logedinuser = loadedProfile.name;
  res.render("index.ejs", { data: loadedProfile });
});

app.post("/saveProfile", async (req, res) => {
  console.log("er wordt een profiel ingeladen");
  let input = req.body;
  console.log(input);
  if (input.delete == "on") {
    console.log("uw profiel wordt verwijdert");

    const del = await dbConnetion.deleteUser(input);
    logedinuser = "";
    res.render("login.ejs");
  } else {
    const save = await dbConnetion.updateUser(input);
    res.render("index.ejs", { data: input });
  }
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
  console.log(`BTapp listening at http://localhost:${port}`);
});
