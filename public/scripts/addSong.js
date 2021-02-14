// let button = document.querySelector('#addSong');
let Spotify = require('node-spotify-api');
let ejs = require('ejs')
let value = toString()

let spotify = new Spotify({
  id: 'd5e588b968774c59b1e8b2eebf2a8514',
  
});


// console.log(process.argv);
let inputArray = [];

for (let i = 2; i <process.argv.length; i++) {
 inputArray.push(process.argv[i])
}

let inputString = inputArray.join(' ');
// console.log(inputString)


// function addSong (){
spotify.search({ type: 'track', query: inputString }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data)
let x = data.tracks.items[0];
console.log(x)

let songName = data.tracks.items[0].name
console.log(songName)

songArtistList = data.tracks.items[0].artists
// console.log(songArtistList)

for (let i = 0; i < songArtistList.length; i++) { 
  console.log(songArtistList[i].name);
}
songID = data.tracks.items[0].id
console.log('Song ID: ' + songID)

});
// }
// button.addEventListener('click', addSong);