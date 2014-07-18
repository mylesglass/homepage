// weather.js
// Myles Glass 2014
// Uses SimpleWeather.js (http://simpleweatherjs.com/) by James Fleeting (@fleetingftw) to get easy access to Yahoo Weather.

$(document).ready(function() {
  $.simpleWeather({
    location: 'Wellington, NZ',
    woeid: '',
    unit: 'c',
    success: function(weather) {
    	// Get the condition of current weather
      	var condition = getCondition(weather.code); 

		// BACKGROUND COLOUR
		// get current time, and parse hour for the days sunset and sunrise
		var time = getTime();
		var sunset = parseInt(weather.sunset) + 12;
		var sunrise = parseInt(weather.sunrise);

		// set to night colour if it is nighttime.
		if(time > sunset || time < sunrise){
			html = '<div class=starry-bg></div>';
		}
		else {
			html = '<div class='+condition+'-bg></div>';
		}
		$('#weather-bg').html(html);

		// WEATHER ICON
      	html = '<div class='+condition+'></div';     	
    	$('#weather-icon').html(html);

    },
    error: function(error) {
      $("#weather-icon").html('<p>'+error+'</p>');
    }
  });
});

// Sorts out what the weather code means, and decides what icon catergory it fits into.
// Returns a string condition.
function getCondition (code) {
	// What the different weather codes signify (simplified)
	// visit https://developer.yahoo.com/weather/#codes for full detail
	var sunny = [32,34,36];
   	var cloudy = [25,26,27,28,29,30,44];
    var rainy = [6,8,9,10,11,12,35,40];
    var rainbow = [3200];
    var night = [31,33];
    var stormy = [0,1,2,3,4,37,38,38,45,47];
    var snowy = [5,7,13,14,15,16,17,18,41,42,43,46];

    // could probably have made this better
    if(contains(sunny, code)) return "sunny";
    else if(contains(cloudy, code)) return "cloudy";
    else if(contains(rainy, code)) return "rainy";
    else if(contains(rainbow, code)) return "rainbow";
    else if(contains(night, code)) return "starry";
    else if(contains(stormy, code)) return "stormy";
    else if(contains(snowy, code)) return "snowy";

    // returns rainbow if nothing else is found, because it's never going to be used
    return "rainbow";
}


// Check if an array contains an object.
function contains (array, obj) {
	for(var i = 0; i < array.length; i++) {
		if(array[i] == obj) {
			return true;
		}
	}
	return false;
}

// Returns the current hour of the day in 24h time.
function getTime() {
	var currentTime = new Date();
	var hours = currentTime.getHours();
	return hours;
}