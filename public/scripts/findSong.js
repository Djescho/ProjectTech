var Spotify = require('node-spotify-api');
let value = toString()
var spotify = new Spotify({
  id: 'd5e588b968774c59b1e8b2eebf2a8514',
  secret: 'a secret darling <3'
});
 
spotify.search({ type: 'track', query: 'Wedding song wendy shay' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data)
console.log(data.items)
let x = data.items
let y = parseInt(x)
console.log(y)

});