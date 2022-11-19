console.log('Starting control panel');

const bc = new BroadcastChannel("channel");
const bcObs = new BroadcastChannel("channelObs");

var c = 0;

var newsTicker = new Array();
newsTicker.push("Texte 1");
newsTicker.push("Texte 2");
newsTicker.push("Texte 3");

var ATEMbuttons = new Array();

var scenesTabArray = new Array();

function increment() {
        console.log("Output console : "+c);
        cons.textContent="Output console : "+c;
        bc.postMessage(c);
        c++; 
}

function showTime() {
        var msg = {
                "id": "changeTime",
                "data": ""
        };
        bc.postMessage(msg);
}

function showTicker() {
        var msg = {
                "id": "showTicker",
                "data": ""
        };
        bc.postMessage(msg);
}

function sendTickerNews() {
        var msg = {
                "id": "updateTicker",
                "data": newsTicker
        };
        bc.postMessage(msg);
}

function updateNewsTab() {
        newsTab.innerHTML="<option value=''>--Please choose a line to remove--</option>";
        newsTicker.forEach(element => {
                newsTab.innerHTML+="<option value='elem'>"+element+"</option>\n";
        });
}

function updateScenesTab() {
        scenesTab.innerHTML="<option value=''>--Select scene--</option>";
        scenesTabArray.forEach(element => {
                scenesTab.innerHTML+="<option value='"+element+"'>"+element+"</option>\n";
        });
}

function updateNewArray() {
        if (addingNewsField.value != "") {
                newsTicker.push(addingNewsField.value);
                addingNewsField.value="";
                updateNewsTab();
                sendTickerNews();
        }
}

function updateNewArray2() {
        //bc.postMessage(newsTab.selectedIndex);
        if (newsTab.selectedIndex != 0) {
                newsTicker.splice(newsTab.selectedIndex-1, 1);
                updateNewsTab();
                sendTickerNews();
        }
}

function loadTab(element) {

        var tabs=document.getElementById('tabs').getElementsByTagName("button");
        for (var i=0; i < tabs.length; i++) {
                if(tabs[i].id == element.id) 
                        document.getElementById(tabs[i].id+"d").hidden=false;
                else
                        document.getElementById(tabs[i].id+"d").hidden=true;
        }
}

function changeScene() {
        if (scenesTab.selectedIndex != 0) {
                msg = {
                        "id": "changeScene",
                        "sender": "panel",
                        "data": scenesTab.value
                };
                //bc.postMessage("Change : "+scenesTab.value);
                bcObs.postMessage(msg);
        }
}

function changeSceneATEM1() {
        var msg = {
                "id": "changeScene",
                "sender": "panel",
                "data": scenesTabArray[0]
        };
        bcObs.postMessage(msg);
        ATEMbuttons[0].style.backgroundColor = "red";
        ATEMbuttons[1].style.backgroundColor = "gray";
        ATEMbuttons[2].style.backgroundColor = "gray";
        ATEMbuttons[3].style.backgroundColor = "gray";
}
function changeSceneATEM2() {
        var msg = {
                "id": "changeScene",
                "sender": "panel",
                "data": scenesTabArray[1]
        };
        bcObs.postMessage(msg);
        ATEMbuttons[0].style.backgroundColor = "gray";
        ATEMbuttons[1].style.backgroundColor = "red";
        ATEMbuttons[2].style.backgroundColor = "gray";
        ATEMbuttons[3].style.backgroundColor = "gray";
}
function changeSceneATEM3() {
        var msg = {
                "id": "changeScene",
                "sender": "panel",
                "data": scenesTabArray[2]
        };
        bcObs.postMessage(msg);
        ATEMbuttons[0].style.backgroundColor = "gray";
        ATEMbuttons[1].style.backgroundColor = "gray";
        ATEMbuttons[2].style.backgroundColor = "red";
        ATEMbuttons[3].style.backgroundColor = "gray";
}
function changeSceneATEM4() {
        var msg = {
                "id": "changeScene",
                "sender": "panel",
                "data": scenesTabArray[3]
        };
        bcObs.postMessage(msg);
        ATEMbuttons[0].style.backgroundColor = "gray";
        ATEMbuttons[1].style.backgroundColor = "gray";
        ATEMbuttons[2].style.backgroundColor = "gray";
        ATEMbuttons[3].style.backgroundColor = "red";
}


window.onload = function () {
        b1 = document.getElementById("b1");
        checkbox1 = document.getElementById("time");
        checkbox2 = document.getElementById("ticker");
        cons = document.getElementById("console");
        addingNewsField = document.getElementById("tickerText");
        addingNewsButton = document.getElementById("addButton");
        newsTab = document.getElementById("tickerTexts");
        scenesTab = document.getElementById("scenesTab");
        removingNewsButton = document.getElementById("removeButton");
        refreshTickerButton = document.getElementById("refreshTicker");

        changeSceneButton = document.getElementById("changeSceneButton");

        for (let i = 0; i < 4; i++) {
                ATEMbuttons.push(document.getElementById("atemButton"+(i+1)));
        }
        ATEMbuttons[0].addEventListener('click',changeSceneATEM1);
        ATEMbuttons[1].addEventListener('click',changeSceneATEM2);
        ATEMbuttons[2].addEventListener('click',changeSceneATEM3);
        ATEMbuttons[3].addEventListener('click',changeSceneATEM4);

        b1.addEventListener('click',increment);
        checkbox1.addEventListener('change', showTime);
        checkbox2.addEventListener('change', showTicker);
        addingNewsButton.addEventListener('click',updateNewArray);
        removingNewsButton.addEventListener('click',updateNewArray2);
        refreshTickerButton.addEventListener('click',sendTickerNews);
        changeSceneButton.addEventListener('click',changeScene);

        updateNewsTab();
        sendTickerNews();

        msg = {
                "id": "getScenes",
                "sender": "panel",
                "data": ""
        };
        bcObs.postMessage(msg);
        updateScenesTab();

        ATEMbuttons[0].style.backgroundColor = "gray";
        ATEMbuttons[1].style.backgroundColor = "gray";
        ATEMbuttons[2].style.backgroundColor = "gray";
        ATEMbuttons[3].style.backgroundColor = "gray";

        
        /*var msg = {
                "id": "getVersion",
                "sender": "panel",
                "data": ""
        };
        bcObs.postMessage(msg);
        msg = {
                "id": "getCurrentScene",
                "sender": "panel",
                "data": ""
        };
        bcObs.postMessage(msg);*/
        
};

bcObs.onmessage = (event) => {
        var msg;
        switch (event.data.id) {
                case "getVersion2":;
                        msg = event.data.data;
                case "getControlLevel2":
                        msg = event.data.data;
                case "getScenes2":
                        msg = event.data.data+"";
                        scenesTabArray = msg.split(",");
                        updateScenesTab();
                case "getCurrentScene2":
                        msg = event.data.data;
                default:
                        //msg = "From default in panel :"
                        msg = event.data.data;
        }
        //bc.postMessage(msg+"");
};