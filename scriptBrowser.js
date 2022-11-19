console.log('Starting browser');

const bc = new BroadcastChannel("channel");
var text1;
var footer;
var date;
var ticker;
var ticker2;



var newsTicker = new Array();
newsTicker.push("Text 1");
newsTicker.push("Text 2");
newsTicker.push("Text 3");

function putOnOutput(data) {
        switch (data.id) {
                case "changeTime":
                        footer.hidden = !footer.hidden;
                        break;
                case "showTicker":
                        ticker.hidden = !ticker.hidden;
                        break;
                case "updateTicker":
                        newsTicker = data.data;
                        updateTicker();
                        break;
                default:
                        if (typeof data.data !== "undefined" && data.data !== "" )
                                text1.textContent = text1.textContent+"\n" +data;
                        else if (typeof data === "string")
                                text1.textContent = text1.textContent+" "+data;
                        else
                                text1.textContent = text1.textContent+"\nNULL";
                        break;
        }
}

bc.onmessage = (event) => {
        console.log(event);
        //putOnOutput("From browser : ");
        putOnOutput(event.data);
};

function updateTicker() {
        ticker2.innerHTML="";
        newsTicker.forEach(element => {
                ticker2.innerHTML+="<div class='hitem'><h1>"+element+"</h1></div>\n";
        });
        root.style.setProperty("--speed",(-(newsTicker.length)*100)+"%");
        root.style.setProperty("--speed2",((newsTicker.length)*8)+"s");
        //bc.postMessage(root.style.getPropertyValue("--speed"));
}

function getActualTime() {
        var d = new Date();
        var hours = ('0'+d.getHours()).slice(-2);
        var minutes = ('0'+d.getMinutes()).slice(-2);
        var seconds = ('0'+d.getSeconds()).slice(-2);
        return hours+":"+minutes+":"+seconds;
}

setInterval(function () {
        date.textContent = getActualTime();
}, 1000);

window.onload = function () {
        text1 = document.getElementById("text1");
        footer = document.getElementById("footer");
        date = document.getElementById("date");
        ticker = document.getElementById("ticker");
        ticker2 = document.getElementById("ticker2");

        date.textContent = getActualTime();

        updateTicker();
};