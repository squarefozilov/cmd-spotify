require("dotenv").config();
var keys = require("./jsmodules/keys");
var fs = require("fs");
var Spotify = require('node-spotify-api');
const path = './jsmodules/logs.txt'
var concert = "";
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});
var userOption = process.argv[2];
//console.log(userOption);
var inputParameter = process.argv[3];
inputParameter = process.argv.splice(0, 3);
inputParameter = process.argv.join(' ')
//console.log(inputParameter);

//This functions sends request for song to the spotify server and gets the response from spotify as a Object
function getTheartist(song) {
 if (!song) {
  song = "The Sign"
 }
 
 spotify.search({
  type: 'track',
  query: song,
  limit: 1
 }, function(err, data) {
  if (err) {
   //logfile("err",err);
   return console.log('Error occurred: ' + err);

  }
  // console.log(data.tracks.artist.album); 
  console.log("Artist ->" + data.tracks.items[0].artists[0].name);
  console.log("The song's name ->" + data.tracks.items[0].name);
  console.log("A preview link of the song from Spotify ->" + data.tracks.items[0].album.external_urls.spotify);
  console.log('Album->' + data.tracks.items[0].album.name);
 });
}

// get TheMovie function using axios request to omdb and gets object of the specific movie 
function getTheMovie(movieLookup) {
 var axios = require("axios");
 axios.get("http://www.omdbapi.com/?t=" + movieLookup + "&y=&plot=short&apikey=trilogy").then(
   function(response) {
    console.log("Title of the movie->" + response.data.Title);
    console.log("Year the movie came out " + response.data.Year);
    console.log("IMDB Rating of the movie " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating of the movie  " + response.data.Ratings[1].Value);
    console.log("Country where the movie was produced " + response.data.Country);
    console.log("Language of the movie " + response.data.Language);
    console.log("Plot of the movie " + response.data.Plot);
    console.log("Actors in the movie " + response.data.Actors);
   })
  .catch(function(error) {
   if (error.response) {
    console.log("---------------Data---------------");
    console.log(error.response.data);
    console.log("---------------Status---------------");
    console.log(error.response.status);
    console.log("---------------Status---------------");
    console.log(error.response.headers);
   } else if (error.request) {
    console.log(error.request);
   } else {
    console.log("Error", error.message);
   }
   console.log(error.config);
  });
}

// the function reads the text from the random.txt and gives as parameter to function Showresult 
//  those text will be use as a parameter to the showResult function 
function getTodo(value) {
 fs.readFile("node_modules/random.txt", "utf8", function(error, data) {
  if (error) {
   return console.log(error);
  }
  var dataArr = data.split(',');
  showResults(dataArr[0], dataArr[1]);
 })
}
// getting sending request to the server bandsintown and getting the object which is has information about event
function getTheBand(band) {
 if (!band) {
  band = "Mumford & Sons"
 }
 var axios = require("axios");
 axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
   function(response) {
    //console.log(axios.get);
    //console.log("Band----" + response.data[0]);
    console.log("Name of venue-" + response.data[0].venue.name);
    console.log("Country-" + response.data[0].venue.country + "--City-" + response.data[0].venue.city);
    //console.log(moment(response.data[0].datetime , "MM-DD-YYYY"));
    // console.log(moment(response.data[0].datetime , "MM-DD-YYYY"));


   })
  .catch(function(error) {
   if (error.response) {} else if (error.request) {
    console.log(error.request);
   } else {
    console.log("Error", error.message);
   }
   console.log(error.config);
  });
}

// saving all the user inputs to the file as history of the searchs
function logfile(operation, command) {
 if (fs.existsSync(path)) {
  fs.appendFileSync('jsmodules/logs.txt', operation + " " + command + "\n");
 } else {

 }
}
// 
function showResults(userOption, inputParameter) {
 logfile(userOption, inputParameter);
 switch (userOption) {
  case 'spotify-this-song':
   getTheartist(inputParameter);
   //console.log("eeeee");
   break;
  case 'movie-this':
   getTheMovie(inputParameter);
   break;
  case 'concert-this':
   getTheBand(inputParameter);
   break;
  case 'do-what-it-says':
   getTodo(inputParameter);
   break;
  default:
   console.log("Give a command");

 }
}
//calling the specific function depend of the user command
showResults(userOption, inputParameter);