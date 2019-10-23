function append(m) { 
    var events = document.getElementById('events').innerHTML;
    var textContent = events + m + '\n';
   document.getElementById('events').innerHTML = textContent;
}

class calender_event {
    constructor(title = '', desc = '', eventLocation = '', time = '') {
        this.title = title;
        this.desc = desc;
        this.eventLocation = eventLocation;
        this.time = time;
    }
}

class calender {
    constructor(name='',events=['']) {
        this.name = name;
        this.events = events;
    }
}

function addEvent(event) {
    var date = new Date(event.time*1000);
    time = date.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });  
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    day = days[date.getDay()];
    append('<h2>'+day+'</h1>');
    append('<h2>'+eventc+'</h3>');
    append('<h3>  '+event.e.title+'</h2>');
    append('<h3>  '+time+'</h3>');
    append('<h3>  '+event.desventLocation+'</h3>');
}

function getCalender() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            //xmlHttp.responseText is response
            addCalender(parseCalender(JSON.parse(this.responseText))); 
        } 
    }
    xmlHttp.open("GET", 'http://' + config.jarvis_home_api_location+'/calender/v1?key='+config.jarvis_home_key, true); 
    xmlHttp.send(null);
}

function parseCalender(calender_encoded) {
    var i = 0;
    var events;
    for (i < calender_encoded.evenCount; i++;) {
        events[i] = new calender_event(calender_encoded.events[i].title,calender_encoded.events[i].description,calender_encoded.events[i].location,calender_encoded.events[i].time);
    }
    var cal = new calender(calender_encoded.calenderName,events);
    return cal;
}

function addCalender(cal) {
    var i = 0;
    for(i < cal.events.length; i++;) {
        addEvent(cal.events[i]);
    }  
}

function exampleEvent() {
    var d = new Date();
    var time = d.getUTCMilliseconds()/1000;
    var event = new calender_event('Test Event','This is a test event aiming to show a example','London,UK',time);
    addEvent(event);
}
