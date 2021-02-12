var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: 'd5e588b968774c59b1e8b2eebf2a8514',
  secret: 'c1be4cdda8824d93a63bfacb07003537'
});
 
spotify.search({ type: 'track', query: 'Wedding song wendy shay' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data)
console.log(data.items)
let x = data.items
console.log(x.value)

});