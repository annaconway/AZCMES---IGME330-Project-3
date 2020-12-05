import * as spaceText from "./donki.js"
import * as giphy from "./giphy.js"
import * as dates from "./dates.js"
import * as text from "./text.js"
import * as nytimes from "./nytimes.js"

let textBox, calender, searchButton, randomButton, nytButton, spaceForcastButton;
let timeslink="", spaceNote=""; 

export function init()
{
    textBox = document.querySelector("#return");
    calender = document.querySelector("#start");
    searchButton = document.querySelector("#search");
    randomButton = document.querySelector("#random");
    nytButton = document.querySelector("#article");
    spaceForcastButton = document.querySelector("#forecast");

    calender.value = dates.yesterday();
    search();


    setUpUI();
}

function reset()
{
    textBox.innerHTML = text.getLoadingText();
    giphy.generateGif();
    timeslink = "";
    spaceNote = "";
}

function search()
{
    reset();

    let date = calender.value;
    let worldText = "";
    let solarText = "";

    function donkiCallback(mainText, additionalText)
    {
        solarText = mainText;
        spaceNote = additionalText;

        if(worldText != "")
        {
            textBox.innerHTML = text.formatFinalString(solarText,worldText);
        }
    }

    function nytCallback(mainText, additionalText)
    {
        worldText = mainText;
        timeslink = additionalText;
        
        if(solarText != "")
        {
            textBox.innerHTML = text.formatFinalString(solarText,worldText);
        }
    }

    spaceText.getSolarEventText(dates.addDays(date,-1),date,donkiCallback);
    nytimes.getWorldEventText(date,nytCallback);
}

function openTimes()
{
    if(timeslink != "")
    {
        window.open(timeslink,"_blank");
    }
}

function setUpUI(){
    searchButton.onclick = search;
    nytButton.onclick = openTimes;
    randomButton.onclick = _ => {
        calender.value = dates.randomDateString();
        search();
    }
}