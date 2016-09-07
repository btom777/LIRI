

var nodeArgs = process.argv;
var action = process.argv[2];
var value = nodeArgs.splice(0,3);
var movietitle = "";
var spotifysearch = "";

if (action == "movie-this") {
	omdbmovie();
}
else if (action == "my-tweets") {
	twittertweet();
}
else if (action == "spotify-this-song") {
	spotifymusic();
}

function omdbmovie() {
	for (i = 0; i < nodeArgs.length; i++) {
		movietitle = nodeArgs.join("+");
	};

	if (movietitle == "") {
		movietitle = "Mr.+Nobody";
	}

	var movies = require('request');

	// Then we use the package to search for the weather at a location
	var requestURL = "http://www.omdbapi.com/?t=" + movietitle + "&y=&plot=short&r=json&tomatoes=true";
	movies(requestURL, function (error, response, body) {
	    if(error) {
			console.log(error);
		}
	    var movie = JSON.parse(body);
	    console.log("Title: " + movie.Title);
	    console.log("Year: " + movie.Year);
	    console.log("IMDB Rating: " + movie.imdbRating);
	    console.log("Country Produced: " + movie.Country);
	    console.log("Language: " + movie.Language);
	    console.log("Plot: " + movie.Plot);
	    console.log("Cast: " + movie.Actors);
	    console.log("Tomatoes Rating: " + movie.tomatoRating);
	    console.log("Tomatoes Website: " + movie.tomatoURL);
	});
};

function twittertweet() {
	var twitter = require('twitter');
	var stuffINeed = require('./keys.js');
	var client = new twitter(stuffINeed.twitterKeys);
	var tweetCount = 0;

	client.get('statuses/user_timeline', {screen_name: 'blankspace_007', count: 20}, function(error, tweetsData) {
        if (error) {
            console.log(error);
	        return;
        }
        for (var tweetNum in tweetsData) {
            var tweetTime = tweetsData[tweetNum].created_at;
            var tweetText = tweetsData[tweetNum].text;
            var tweetCount = tweetNum;
            var output = tweetCount + ": " + tweetTime + " @ " + tweetText;
	        console.log(output);
        }
        console.log(tweetsData);
    });
};

function spotifymusic() {
	var spotify = require('request');

	for (i = 0; i < nodeArgs.length; i++) {
		spotifysearch = nodeArgs.join("+");
	};

	if (spotifysearch == "") {
		spotifysearch = "Ace+of+Base";
 
		spotify('https://api.spotify.com/v1/search?q=' + spotifysearch + '&limit=5&type=track', function(error, response, body) {
		    if (error) {
		        console.log('Error occurred: ' + error);
		        return;
		    }
		 	var music = JSON.parse(body);
		    console.log("Artist: " + music.tracks.items[1].artists[0].name);
		    console.log("Song Name: " + music.tracks.items[1].name);
		    console.log("Song Link: " + music.tracks.items[1].external_urls.spotify);
		    console.log("Album Name: " + music.tracks.items[1].album.name);
		});
	}
	else {
		spotify('https://api.spotify.com/v1/search?q=' + spotifysearch + '&limit=5&type=track', function(error, response, body) {
		    if (error) {
		        console.log('Error occurred: ' + error);
		        return;
		    }
		 	var music = JSON.parse(body);
		    console.log("Artist: " + music.tracks.items[0].artists[0].name);
		    console.log("Song Name: " + music.tracks.items[0].name);
		    console.log("Song Link: " + music.tracks.items[0].external_urls.spotify);
		    console.log("Album Name: " + music.tracks.items[0].album.name);
		});
	};
};