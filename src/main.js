import * as spaceText from "./donki.js"
import * as giphy from "./giphy.js"
import * as dates from "./dates.js"
import * as text from "./text.js"
import * as nytimes from "./nytimes.js"

//html elements
let textBox, calender, searchButton, randomButton, nytButton, spaceForcastButton;
//holds lists of information needed for controls
let timeslinks="", spaceNotes="";
//index for additional control arrays
let index = 0; 
//most text in the application comes from the text generator
let textGenerator;

export function init()
{
    //control init
    textBox = document.querySelector("#return");
    calender = document.querySelector("#start");
    searchButton = document.querySelector("#search");
    randomButton = document.querySelector("#random");
    nytButton = document.querySelector("#article");
    spaceForcastButton = document.querySelector("#forecast");

    //create a generator with empty lists for creating loading text
    textGenerator = new text.TextGenerator([],[]);

    //default calender to yesterday so apis have data to pull
    calender.value = dates.yesterday();
    search();


    setUpUI();
}

//puts the app into a loading state
function loading()
{
    textBox.innerHTML = textGenerator.loading();
    giphy.generateGif();
    timeslink = "";
    spaceNote = "";
    index = 0;
}

//creates a new text generator and displays information
function loaded(solarText,worldText)
{
    textGenerator = new text.TextGenerator(solarText,worldText);
    textBox.innerHTML = textGenerator.next();
}

//advances text generator and other values
function nextConspiricy()
{
    index++;
    textBox.innerHTML = textGenerator.next();
}

//called to get new data from apis after params have been updated
function search()
{
    //init search
    loading();

    let date = calender.value;
    //returned data from apis
    let worldText = [];
    let solarText = [];

    function donkiCallback(mainText, additionalText)
    {
        solarText = mainText;
        spaceNotes = additionalText;

        //if other data is present loading is done, put app into loaded state
        if(worldText.length > 0)
            loaded(solarText,worldText);
    }

    function nytCallback(mainText, additionalText)
    {
        worldText = mainText;
        timeslinks = additionalText;
        
        //if other data is present loading is done, put app into loaded state
        if(solarText.length > 0)
            loaded(solarText,worldText);
    }

    spaceText.getSolarEventText(dates.addDays(date,-1),date,donkiCallback);
    nytimes.getWorldEventText(date,nytCallback);
}

//opens the nyt article refrenced in the currently displayed text
function openTimes()
{
    if(timeslinks.length > index)
    {
        window.open(timeslinks[index],"_blank");
    }
}

//associates controls with methods
function setUpUI(){
    searchButton.onclick = search;
    nytButton.onclick = openTimes;
    randomButton.onclick = _ => {
        calender.value = dates.randomDateString();
        search();
    }
}