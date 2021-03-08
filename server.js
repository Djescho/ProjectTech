console.log("Hi there, lets spin the server up shall we?");

require("dotenv").config();

//server en tamplating constante
const express = require("express");
const app = express();
const port = 3000;
const { render } = require("ejs");
//db settings
const dbConnetion = require("./db");

const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");


//fake login:
let logedinuser = "";

//instellen van templating engine en publiek toegangelijke map in express
app.set("view enigine", "ejs");
app.set("views", "views");
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Wanner iemand naar localhost:3000 navigeert in de url balk
app.get("/", (req, res) => {
  //met een nieuwe login rest de huidige gebruiker
  logedinuser = "";
  console.log(logedinuser);
  res.render("login.ejs");
});

//wanner er iemand naar /editprile navigeert in de url balk
app.get("/editprofile", async (req, res) => {
  console.log("data wordt opgehaald");
  //extra security zodat hier het correcte account wordt geladen
  let input = logedinuser;
  console.log(input);
  //maakt verbinding met het database bestand met het gevonden profiel
  const loadedProfile = await dbConnetion.getUser(input);
  console.log(loadedProfile);
  res.render("editprofile.ejs", { data: loadedProfile });
});
//wanneer er iemand naar /newprofile navigeert
app.get("/newprofile", (req, res) => {
  res.render("newprofile.ejs");
});

//Als er een formuler post naar /newProfile wordt deze functie actief. Wordt alleen bij nieuwe gebruikers actief als ze hun prfiel hebben aangemaakt.
app.post("/newProfile", (req, res) => {
  console.log("Er is een nieuw profiel toegevoegd");
  //zet ingevoerde data om naar een vairabele die gebruikt wordt om het profiel naar de server te posten.
  let userProfile = req.body;
  console.log(userProfile);
  dbConnetion.createUser(userProfile);
  //De huidige gebruiker wordt veranderd naar die van de nieuwe gebruiker
  logedinuser = userProfile.name;
  //profiel pagina wordt direct gerenderd met de nieuwe data
  res.render("index.ejs", { data: userProfile });
});

//start zodra het inlog veld in ingevoerd en dat formulier is verstuurd
app.post("/login", async (req, res) => {
  console.log("er wordt ingelogd");
  // pakt de naam uit het input veld en gaat op zoek naar de bij behorende data set in de database
  let input = req.body.inlognaam;
  console.log(input);
  const loadedProfile = await dbConnetion.getUser(input);
  console.log(loadedProfile);
  logedinuser = loadedProfile.name;
  //rendert de pagina met het gevonden profiel
  res.render("index.ejs", { data: loadedProfile });
});

//Als een bestaand egebruiker zijn profiel wijzigt en opslaat start deze functie
app.post("/saveProfile", async (req, res) => {
  console.log("er wordt een profiel ingeladen");
  let input = req.body;
  console.log(input);
  //Als de gebruiker zijn account wilt verwijderen wordt dat hier gechecked
  if (input.delete == "on") {
    console.log("uw profiel wordt verwijdert");
    //verstuurd de ingevulde naam in het formulier naar de database om het account met de overeenkomende naam te verwijderen.
    const del = await dbConnetion.deleteUser(input);
    logedinuser = "";
    res.render("login.ejs");
  } else {
    //Update het porfiel met dezelfde naam met de nieuwe ingevoerde data
    const save = await dbConnetion.updateUser(input);
    res.render("index.ejs", { data: input });
  }
});

//als er een pagina niet gevonden wordt krijgen we deze error
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

//zodra port actief komt geeft die en melding dat de server aan staat
app.listen(port, () => {
  console.log(`BTapp listening at http://localhost:${port}`);
});
