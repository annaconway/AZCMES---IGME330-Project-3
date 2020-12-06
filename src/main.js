import * as spaceText from "./donki.js"
import * as giphy from "./giphy.js"
import * as dates from "./dates.js"
import * as text from "./text.js"
import * as nytimes from "./nytimes.js"

let textBox, calender, searchButton, randomButton, nytButton, spaceForcastButton;
let timeslink="", spaceNote=""; 
let textGenerator;

export function init()
{
    textBox = document.querySelector("#return");
    calender = document.querySelector("#start");
    searchButton = document.querySelector("#search");
    randomButton = document.querySelector("#random");
    nytButton = document.querySelector("#article");
    spaceForcastButton = document.querySelector("#forecast");

    //create a generator with empty lists for loading text
    textGenerator = new text.TextGenerator([],[]);

    calender.value = dates.yesterday();
    search();


    setUpUI();
}

function reset()
{
    textBox.innerHTML = textGenerator.loading();
    giphy.generateGif();
    timeslink = "";
    spaceNote = "";
}

function search()
{
    reset();

    let date = calender.value;
    let worldText = [];
    let solarText = [];

    function donkiCallback(mainText, additionalText)
    {
        solarText = mainText;
        spaceNote = additionalText;

        if(worldText.length > 0)
        {
            textGenerator = new text.TextGenerator(solarText,worldText);
            textBox.innerHTML = textGenerator.next();
        }
    }

    function nytCallback(mainText, additionalText)
    {
        worldText = mainText;
        timeslink = additionalText;
        
        if(solarText.length > 0)
        {
            textGenerator = new text.TextGenerator(solarText,worldText);
            textBox.innerHTML = textGenerator.next();
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