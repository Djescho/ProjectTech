const { precompile } = require("handlebars");
let Spotify = require("node-spotify-api");
require("dotenv").config();

let spotify = new Spotify({
  id: "d5e588b968774c59b1e8b2eebf2a8514",
  secret: process.env.SPOTAPIKEY;
});

let songObject = [];
//start looping through input
function convertMusic(inputQuery) {
  spotify.search({ type: "track", query: inputQuery }, function (err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    let songdata = data.tracks.items[0];
    // console.log(songdata);
    let songartist = songdata.album.artists[0].name;
    console.log(songartist);
    let artistArray = songdata.artists;
    // console.log(artistArray);

    if (artistArray.length > 1) {
      //als er meerde artiesten op een track zitten
      console.log("meer dan 1 artietst");
      let allArtists = [];
      //loopt door alle arteist objecten om hun naam op te halen
      for (let i = 0; i < artistArray.length; i++) {
        let artist = artistArray[i].name;
        console.log(artist);
        allArtists.push(artist);
      }
      console.log("artiesten", allArtists);
      //object obouwen
      let trackobject = {
        title: songdata.name,
        artist: allArtists,
        coverURL: songdata.album.images[0].url,
        matchID: songdata.album.id,
      };
      console.log(trackobject);
      songObject.push(trackobject);
    } else {
      //als er maar een artiest op een track zit
      console.log("Artiest " + songartist);
      let trackobject = {
        title: songdata.name,
        artist: songartist,
        coverURL: songdata.album.images[0].url,
        matchID: songdata.album.id,
      };
      console.log("trackopject:", trackobject);
      songObject.push(trackobject);
    }
  });
}
function inputLoop(inputString) {
  for (let i = 0; i < inputString.length; i++) {
    convertMusic(inputString[i]);
  }
  //zodra de functie klaar is geberut het volgende
  console.log("Ready for export", songObject);
  module.exports.songObject = songObject;
  console.log(songObject);
  return;
}

inputLoop([
  "the war on drugs pain",
  "nicki miniaj megatron",
  "editors magazine",
  "roses en my sons simgm",
  "run for cover the killers",
  "oscar and the wolf fever",
  "7 rings ariana grande",
  "rhodes you a& i",
]);
// module.exports.inputLoop = inputLoop;
