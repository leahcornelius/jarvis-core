// Copyright 2019 Leo Cornelius @ jarvis project
// this file allows you to use the darksky api for weather
// openweathermap will be replaced by defult with this in beta v0.2.0

var key = 'e4b30a5b2b1c866041d6674f84834940';
var currentCoords = ['', '']; 
// get the next 3 days (and todays!) timestamp for when passing to getWeather(cords, time,callback);
var oneTimestamp = getTimestamp(0);
var twoTimestamp = getTimestamp(1);
var threeTimestamp = getTimestamp(2);
var fourTimestamp = getTimestamp(3);
currentCoords[0] = localStorage.getItem("lat");
currentCoords[1] = localStorage.getItem("long");
function setLocation(lat, long) {
    console.log(lat + ', ' + long);
    location[0] = lat;
    location[1] = long;
    localStorage.setItem("lat",lat);
    localStorage.setItem("long", long);
}
if (localStorage.getItem("lat") == undefined) {
    navigator.geolocation.getCurrentPosition(function(position) {
        setLocation(position.coords.latitude, position.coords.longitude);
    });
}
function getTimestamp(offset=0) { // offset = the offset in days
    date = new Date();
    date.setDate(date.getDate()+offset);
    console.log(d);
    return Math.round(parseFloat(date.getTime()/1000));
}

function getDarkskyWeather(time) {
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var url = 'https://api.darksky.net/forecast/'+key+'/'+currentCoords[0]+','+currentCoords[1]+','+time+'?exclude=minutely,hourly,flags,alerts';
    var proxy = 'https://cors-anywhere.herokuapp.com/';

    $.ajax({
        url:proxy + url,
        success:function(data) { processWeather(data);}
    });
}

function processWeather(weather) {
    console.log(weather);
    var tempriture = Math.round(parseFloat(((weather.daily.data.temperatureHigh -weather.daily.data.temperatureLow)/2)));
    tempriture = ((tempriture - 32) * 5/9 );
    var wind_speed = weather.daily.data.windSpeed;
    document.getElementById('windspeedone').innerHTML =  Math.round(parseFloat(wind_speed)) + ' mph';
    document.getElementById('tempone').innerHTML = Math.round(parseFloat(tempriture) + '&deg'; 
    document.getElementById('iconone').innerHTML = weatherToIcon(''); // TODO
    var tempnow = Math.round(parseFloat(weather.currently.data.temperature));
    tempow = ((tempnow - 32) * 5/9 );
    document.getElementById('tempnow').innerHTML = Math.round(parseFloat(weather.currently.data.temperature))+ '&deg';
}    
