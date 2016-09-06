var stuffINeed = require('./keys.js');


for (key in stuffINeed.twitterKeys) {
	console.log(key + ": " + stuffINeed.twitterKeys[key]);
}
