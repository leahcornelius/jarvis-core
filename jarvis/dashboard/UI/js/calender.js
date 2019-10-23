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
function addEvent(event) {
    var date = new Date(event.time*1000);
    time = date.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });  
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    day = days[date.getDay()];
    append('<h2>'+day+'</h1>');
    append('<h2>'+event.title+'</h2>');
    append('<h3>  '+time+'</h3>');
    append('<h3>  '+event.desc+'</h3>');
    append('<h3>  '+event.eventLocation+'</h3>');
}

function exampleEvent() {
    var d = new Date();
    var time = d.getUTCMilliseconds()/1000;
    var event = new calender_event('Test Event','This is a test event aiming to show a example','London,UK',time);
    addEvent(event);
}
