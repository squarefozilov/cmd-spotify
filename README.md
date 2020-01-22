# cmd-command-api
cmd-request-api

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

LIRI functionality has for main
 commands 

node liri.js spotify-this-song 

If the song exist in spotify server and if the spotify gives information of the song then it outputs to the terminal following informations.

    Artist(s)
    The song's name
    A preview link of the song from Spotify
    The album that the song is from

If no song is provided then your program will default to "The Sign" by Ace of Base.

node liri.js movie-this 

This will output the following information to your terminal/bash window:
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.


node liri.js concert-this artist

This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and 
render the  information about each event to the terminal.
node liri.js do-what-it-says

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.  
