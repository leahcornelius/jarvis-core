var config = {
    jarvis_home_key: '',
    openweather_key: '1ba6b38a8d342a815f712c216767b991',
    offline_mode: false,
    weather_refresh_rate: 1000*3*60, // recheck weather every 30 mins (1800000  milliseconds)
    location: "Guildford", //function() {
        //fetch('api.jarvis.tk/location/' + this.jarvis_home_key)
          //.then(response => {
            ///return response.json();
    //}
    time_format: 12,
    timezone: (60)* 1, // the number of mins + on UTC (eg 2 = UTC+1:00, 2.5 = UTC+2:30)
}
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var days_abbr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT","SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT","SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT","SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT","SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
var first_il =true;
document.getElementById('icon-one').innerHTML = '<ion-icon name="ios-help">';
document.getElementById('icon-two').innerHTML = '<ion-icon name="ios-help">';
document.getElementById('icon-three').innerHTML = '<ion-icon name="ios-help">';
document.getElementById('icon-four').innerHTML = '<ion-icon name="ios-help">';
var d = new Date();
// day number
var onen = d.getDay();
var twon = d.getDay()+1;
var threen = d.getDay()+2;
var fourn = d.getDay()+3;
console.log(days_abbr[twon]);
console.log(days_abbr[18]);
// day
var one = days[onen];
var two = days[twon];
var three = days[threen];
var four = days[fourn];
// date
var dtwo = new Date(d);
dtwo.setDate(d.getDate()+1);
var dthree =  new Date(dtwo);
dthree.setDate(dtwo.getDate()+1);
var dfour =  new Date(dthree);
dfour.setDate(dthree.getDate()+1);
// timestamp
var onet = d.getTime();
var twot = dtwo.getTime();
var threet = dthree.getTime();
var fourt = dfour.getTime();
// make usable in html
  // day full

//document.getElementById("day-one-f").innerHTML = one;
//document.getElementById("day-two-f").innerHTML = two;
//document.getElementById("day-three-f").innerHTML = three;
//document.getElementById("day-four-f").innerHTML = four;
  // day abbr
document.getElementById("day-one").innerHTML = 'TODAY';
document.getElementById("day-two").innerHTML = days_abbr[twon];
document.getElementById("day-three").innerHTML = days_abbr[threen];
document.getElementById("day-four").innerHTML = days_abbr[fourn];
  // date
//document.getElementById("day-one-date").innerHTML = d;
//document.getElementById("day-two-date").innerHTML = dtwo;
//document.getElementById("day-three-date").innerHTML = dthree;
//document.getElementById("day-four-date").innerHTML = dfour
  // timestamp
//document.getElementById("day-one-timestamp").innerHTML = onet;
//document.getElementById("day-one-timestamp").innerHTML = twot;
//document.getElementById("day-one-timestamp").innerHTML = threet;
//document.getElementById("day-one-timestamp").innerHTML = fourt;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}

function convert_time_format (time) { // edited from https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no 
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
}
function start() {
    startTime();
    getWeather();
}
function startTime() {
    var today = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[today.getDay()] 
    var month = months[today.getMonth()]
    var day_number = today.getDate();
    if (first_il == true) {
        document.getElementById("datep1").innerHTML = day;
        document.getElementById("datep2").innerHTML = month + ' ' + day_number;
        first_il = false;
    }
    if (config.time_format == 12) {
        document.getElementById("time").innerHTML = convert_time_format(today.getHours() + ":" + formatMins(today.getMinutes()));
    }else {
        document.getElementById("time").innerHTML = today.getHours() + ":" + formatMins(today.getMinutes());
    }
        document.getElementById("seconds").innerHTML = formatSeconds(today.getSeconds());
    var t = setTimeout(startTime, 500);
}
function startWeather(w) {
    if (config.offline_mode != true) {
        weatherToIcon(w);
        formatWeather(w);   // for testing ↓
        var t = setTimeout(startWeather, 10000) //config.weather_refresh_rate);
    }

    function newFunction() {
        return getWeather();
    }
}
function formatMins(min) { // adds a zero before mins if the number is only one (eg 1 becomes 01)
    if (min < 10) {
        min = "0" + min;
    }
    return min;
}

function formatSeconds(s) { // adds a zero before the seconds if the number is only one (eg 1 becomes 01)
    if (s < 10) { 
        s = "0" + s;
    }
    return s;
}

function formatWeather(weather) {
    var celcius = Math.round(parseFloat(weather.main.temp)-273.15);
    console.log(celcius);
    console.log(weather);
    var fahrenheit = Math.round(((parseFloat(weather.main.temp)-273.15)*1.8)+32);
    days = ["one", "two", "three", "four"];
    var wind_speed = weather.wind.speed;
    console.log(wind_speed);
    i = 0;
    for (i < 4; i++;) {
        document.getElementById('temp-' +days[i]).innerHTML = celcius + '&deg;';
        document.getElementById('wind-speed-'+days[i]).innerHTML = wind_speed + 'mph';

    }
    //document.getElementById('temp-one').innerHTML = celcius + '&deg;';
    weatherToIcon(weather.weather[0].main.toUpperCase());
}
function weatherToIcon(w) {
    let d =  new Date(w.dt*1000); 
    days = ["one", "two", "three", "four", "one", "two","three"];
    var day = days[d.getDay()];
    var type = w.weather[0].main;
    if (type == "Clouds") {
        document.getElementById('icon-'+day).innerHTML = '<ion-icon name="ios-cloud">';
    }else if (type == "RAIN") {
        document.getElementById('icon-'+day).innerHTML = '<ion-icon name="ios-rainy">';
    } else if (type == "THUNDERSTORM") {
        document.getElementById('icon-'+day).innerHTML = '<ion-icon name="ios-thunderstorm">';
    } else if (type =="SUNNY") {
        document.getElementById('icon-'+day).innerHTML = '<ion-icon name="ios-sunny">';
    } else {
        document.getElementById('icon-'+day).innerHTML = '<ion-icon name="ios-help">'
    }

}
function getWeather() {
    api_key = config.openweather_key;
    location1 = config.location;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            //xmlHttp.responseText is response
            startWeather(JSON.parse(this.responseText)); 
        }
    }
    xmlHttp.open("GET", 'https://api.openweathermap.org/data/2.5/weather?q=' + location1 + '&appid=' + api_key, true); 
    xmlHttp.send(null);

}

// for testing
function demoData() {
    var days = ["one", "two", "three", "four", "one", "two","three"];
    var i;
    var c = 24;
    let  w = 6;
    document.getElementById('temp-one').innerHTML = c;
    console.log(document.getElementById('temp-one').value);
    for (i = 0; i < 4; i++) {
        var day = days[i];
        document.getElementById('temp-' +day).innerHTML = c;
        console.log(document.getElementById('temp-' +day).value);
        //document.getElementById('wind-speed-' +day).innerHTML = w + 'mph';
    }
}