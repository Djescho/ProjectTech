console.log("Hello world, lets spin the server up shall we?");
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

require("dotenv").config();

app.set("view enigine", "ejs");
app.set("views", "views");

app.use(express.static("public"));

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.get kiest wat je bij welke url te zien krijgt.

app.get("/", (req, res) => {
  res.render("index.ejs", { data: { name: "Djescho" } });
});
app.get("/profile", (req, res) => {
  res.render("editprofile.ejs");
});
app.get("/search", (req, res) => {
  res.render("search.ejs");
});

//app.use laat weten welke mappen er middels urls toegangelijk zijn.

app.post("/profile", (req, res) => {
  console.log("something has ben submited!");
  console.log(req.body);
  res.render("profile.ejs", { data: req.body });
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port, () => {
  console.log(`BTapp listening at http://localhost:${port}`);
});
