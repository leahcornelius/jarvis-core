// Copyright 2019 Leo Cornelius @ jarvis project
// this file allows you to use the darksky api for weather
// openweathermap will be replaced by defult with this in beta v0.2.0

var key = 'e4b30a5b2b1c866041d6674f84834940';
var currentCoords = ['', ''];
var t1 = getTimestamp(0);
var t2 =getTimestamp(1);
var t3 = getTimestamp(2);
var t4 = getTimestamp(3);
// get the next 3 days (and todays!) timestamp for when passing to getWeather(cords, time,callback);
var timestamps = [null,t1,t2,t3,t4];
function getTimestamps() { 
    var t1 = getTimestamp(0);
    var t2 =getTimestamp(1);
    var t3 = getTimestamp(2);
    var t4 = getTimestamp(3);
    // get the next 3 days (and todays!) timestamp for when passing to getWeather(cords, time,callback);
    var timestamps = [null,t1,t2,t3,t4];
}

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


function getDarkskyWeather(day) {
    if (day==0) {day= 1;}
    var days= ['null','one','two','three','four'];
    var time = timestamps[day];
    day = days[day];
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var url = 'https://api.darksky.net/forecast/'+key+'/'+currentCoords[0]+','+currentCoords[1]+','+time+'?exclude=minutely,hourly,flags,alerts&units=uk2';
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    $.ajax({
        url:proxy + url,
        success:function(data) { processWeather(data,day);}
    });
}

function processWeather(weather,day) {
    console.log(weather);
    console.log(day);
    var temperatureHigh = Math.round(weather.daily.data[0].temperatureHigh);
    var temperatureLow = Math.round(weather.daily.data[0].temperatureLow)
    var wind_speed = weather.daily.data[0].windSpeed;
    if (day=='one') { // varables only set for current day (eg wind speed, sunset/rise time)
        document.getElementById('windspeed'+day).innerHTML =  Math.round(parseFloat(wind_speed)) + ' mph';
        var d = new Date();
        var currentTime = d.getMilliseconds();
        var sunset = new Date(weather.daily.data[0].sunsetTime * 1000);
        if(sunset.getMilliseconds() < currentTime) { // already been sunset, display sunrise time
            var sunrise = new Date(weather.daily.data[0].sunriseTime * 1000);
            sunrise = sunrise.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true })
            document.getElementById('suntime').innerHTML = sunrise;
            document.getElementById('sunicon').setAttribute('data-icon','')
        } else { // not been sunset yet, display the time of that!
            sunset = sunset.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true })
            document.getElementById('suntime').innerHTML = sunset;
            document.getElementById('sunicon').setAttribute('data-icon','')
        }
    }
    document.getElementById('temp'+day).innerHTML = Math.round(temperatureHigh) + '&deg';
    document.getElementById('temp'+day+'low').innerHTML = Math.round(temperatureLow) + '&deg';
    var tempnow = Math.round(weather.currently.temperature);
    tempow = ((tempnow - 32) * 5/9 );
    document.getElementById('tempnow').innerHTML = tempnow+  '&deg'; 
    darkskyWeatherToIcon(weather.daily.data[0].icon,day); 
    darkskyWeatherToIcon(weather.currently.icon,'now'); 
}    

function darkskyWeatherToIcon(type,day) {
    if(type=='cloudy') {document.getElementById('icon'+day).setAttribute('data-icon',"N");}
    if(type=='clear-day') {document.getElementById('icon'+day).setAttribute('data-icon',"B");}
    if(type=='clear-night') {document.getElementById('icon'+day).setAttribute('data-icon',"C");}
    if(type=='rain') {document.getElementById('icon'+day).setAttribute('data-icon',"R");}
    if(type=='snow') {document.getElementById('icon'+day).setAttribute('data-icon',"W");}
    if(type=='sleet') {document.getElementById('icon'+day).setAttribute('data-icon',"X");}
    if(type=='wind') {document.getElementById('icon'+day).setAttribute('data-icon',"F");}
    if(type=='fog') {document.getElementById('icon'+day).setAttribute('data-icon',"L");}
    if(type=='partly-cloudy-day') {document.getElementById('icon'+day).setAttribute('data-icon',"H");}
    if(type=='partly-cloudy-night') {document.getElementById('icon'+day).setAttribute('data-icon',"I");}
    if(type=='thunderstorm') {document.getElementById('icon'+day).setAttribute('data-icon',"Z");}
    if(type=='tornado') {document.getElementById('icon'+day).setAttribute('data-icon',"9")+'!';}
    if(type=='hail') {document.getElementById('icon'+day).setAttribute('data-icon',"X");}
    if(type=='huricane') {document.getElementById('icon'+day).setAttribute('data-icon',"");}
    if(type=='') {document.getElementById('icon'+day).setAttribute('data-icon',")");}
}
function darkskyInit() {
    getDarkskyWeather(1);
    getDarkskyWeather(2);
    getDarkskyWeather(3);
    getDarkskyWeather(4);
}