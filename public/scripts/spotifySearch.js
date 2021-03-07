let Spotify = require("node-spotify-api");
require("dotenv").config();

let spotify = new Spotify({
  id: "d5e588b968774c59b1e8b2eebf2a8514",
  secret: "5c182bd48b7e40b7ab1dbd1e9577d1f1",
});
userInput = ["wendy shay wedding song", "fantana so what", "zuchu sukari"];
finalObject = [];

console.log(userInput.length);
//start looping through input
for (let i = 0; i < userInput.length; i++) {
  console.log("itteration: " + i);
  //start search on spotify
  spotify.search({ type: "track", query: userInput[i] }, function (err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    //error prevention
    if (data.tracks.total == 0) {
      console.log("no results for " + userInput);
    } else {
      console.log(
        "de zoekopdracht " + userInput[i] + " levert de volgende resultaten: "
      );
      console.log(data);

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

      songObject = {
        title: songName,
        artists: songArtist,
        songID: songID,
      };
      console.log("totale object:");
      console.log(songObject);

      finalObject.push(songObject);
      console.log("query " + i + "has been pushed");
    }
    if (i === userInput.length - 1) {
      console.log("final combined object:");
      console.log(finalObject);
    }
    //sluit spotify serarch
  });

  //sluit loop
}
