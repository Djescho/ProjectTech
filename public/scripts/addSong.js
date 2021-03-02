let Spotify = require("node-spotify-api");
require("dotenv").config();

let spotify = new Spotify({
  id: "d5e588b968774c59b1e8b2eebf2a8514",
  secret: process.env.SPOTAPIKEY,
});

// function searchSong() {
let inputArray = [];
for (let i = 2; i < process.argv.length; i++) {
  inputArray.push(process.argv[i]);
}
let inputString = inputArray.join(" ");
console.log("searched for: " + inputString);

//start search on spotify
spotify.search({ type: "track", query: inputString }, function (err, data) {
  if (err) {
    return console.log("Error occurred: " + err);
  }
  console.log("de zoekopdracht levert de volgende resultaten: ");

  //aan de slag met het eerste zoekresultaat
  let songName = data.tracks.items[0].name;
  console.log("Track Title: " + songName);

  let songArtist = [];
  let songArtistList = data.tracks.items[0].artists;
  for (let i = 0; i < songArtistList.length; i++) {
    songArtist.push(songArtistList[i].name);
  }

  console.log("Artist(s): " + songArtist);

  let songID = data.tracks.items[0].id;
  console.log("Song ID: " + songID);
});
// }
