import * as spaceText from "./donki.js"
import * as giphy from "./giphy.js"
import * as dates from "./dates.js"
import * as text from "./text.js"
import * as nytimes from "./nytimes.js"

// HTML elements
let unlockControls, footer, textBox, calender, searchButton, randomButton, nytButton, spaceForecastButton, rabbitHoleButton, spaceNoteButton, resetButton, giphyToggleButton, nationalRadio, worldRadio;

// Holds lists of information needed for controls
let timeslinks = "", spaceNotes = "";

// Index for additional control arrays
let index = 0;

// Most text in the application comes from the text generator
let textGenerator;

// Local storage info
const prefix = "azc5184-";
const calenderDateKey = prefix + "date";
const radioSelectKey = prefix + "news";
const giphySettingKey = prefix + "giphy";

export function init() {
    // hide stuff
    unlockControls = document.querySelector("#UnlockButtons");
    footer = document.querySelector("footer");
    unlockControls.style.visibility = "hidden";
    footer.style.visibility = "hidden";

    //control init
    textBox = document.querySelector("#return");
    calender = document.querySelector("#start");
    searchButton = document.querySelector("#search");
    randomButton = document.querySelector("#random");
    nytButton = document.querySelector("#article");
    spaceForecastButton = document.querySelector("#forecast");
    rabbitHoleButton = document.querySelector("#rabbitHole");
    spaceNoteButton = document.querySelector("#spaceNote");
    resetButton = document.querySelector("#reset");
    giphyToggleButton = document.querySelector("#giphyToggle");
    nationalRadio = document.querySelector("#national");
    worldRadio = document.querySelector("#world");

    //create a generator with empty lists for creating loading text
    textGenerator = new text.TextGenerator([], []);

    localStorageHandler();

    search();

    setUpUI();
}

//puts the app into a loading state
function loading() {
    textBox.innerHTML = textGenerator.loading();
    timeslinks = "";
    spaceNotes = "";
    index = 0;

    // Disable buttons so user doesn't overload the server
    nytButton.disabled = true;
    rabbitHoleButton.disabled = true;
    spaceNoteButton.disabled = true;
    nationalRadio.disabled = true;
    worldRadio.disabled = true;
}

//creates a new text generator and displays information
function loaded(solarText, worldText) {
    textGenerator = new text.TextGenerator(solarText, worldText);
    textBox.innerHTML = textGenerator.next();

    // Re-enable buttons for user to use
    nytButton.disabled = false;
    rabbitHoleButton.disabled = false;
    spaceNoteButton.disabled = false;
    nationalRadio.disabled = false;
    worldRadio.disabled = false;

    unlockControls.style.visibility = "visible";
    footer.style.visibility = "visible";

}

//advances text generator and other values
function nextConspiricy() {
    index++;
    textBox.innerHTML = textGenerator.next();
}

//called to get new data from apis after params have been updated
function search() {
    if (giphyToggleButton.dataset.showing == "yes") {
        giphy.generateGif();
    }

    localStorage.setItem(calenderDateKey, calender.value)

    //init search
    loading();

    let date = calender.value;
    //returned data from apis
    let worldText = [];
    let solarText = [];

    function donkiCallback(mainText, additionalText) {
        solarText = mainText;
        spaceNotes = additionalText;

        //if other data is present loading is done, put app into loaded state
        if (worldText.length > 0)
            loaded(solarText, worldText);
    }

    function nytCallback(mainText, additionalText) {
        worldText = mainText;
        timeslinks = additionalText;

        //if other data is present loading is done, put app into loaded state
        if (solarText.length > 0)
            loaded(solarText, worldText);
    }

    spaceText.getSolarEventText(dates.addDays(date, -1), date, donkiCallback);
    nytimes.getWorldEventText(date, nytCallback);
}

//opens the nyt article refrenced in the currently displayed text
function openTimes() {
    if (timeslinks.length > index) {
        window.open(timeslinks[index], "_blank");
    }
}

//associates controls with methods
function setUpUI() {
    // Basic buttons
    searchButton.onclick = search;
    nytButton.onclick = openTimes;
    rabbitHoleButton.onclick = nextConspiricy;

    // Shows all space notes at index
    spaceNoteButton.onclick = _ => {

        if (spaceNotes[index] != null) {
            textBox.innerHTML += "<br> <br>";
            textBox.innerHTML += spaceNotes[index];
        }
        else {
            textBox.innerHTML += "<br> <br>";
            textBox.innerHTML += "No notes found.";
        }
    }

    // Resets data
    resetButton.onclick = _ => {
        // Disable giphy
        let bg = document.querySelector("body");
        bg.style.backgroundImage = `none`;
        giphyToggleButton.dataset.showing = "no";

        // Reset calender
        calender.value = dates.yesterday();

        // reset radios
        nationalRadio.checked = true;
        worldRadio.checked = false;
        nytimes.useNational();

        // Search
        search();
    }

    // Decides whether giphy is showing
    giphyToggleButton.onclick = e => {
        if (e.target.dataset.showing == "no") {
            if (confirm("Gifs generated by Giphy may have flashing lights and content that may be disturbing for some users.")) {
                localStorage.setItem(giphySettingKey, "yes");
                e.target.dataset.showing = "yes";
                giphy.generateGif();
            } else {
                return;
            }
        }
        else {
            localStorage.setItem(giphySettingKey, "no");
            let bg = document.querySelector("body");
            bg.style.backgroundImage = `none`;
            e.target.dataset.showing = "no";

        }
    }

    // Generates conspiracy from random date
    randomButton.onclick = _ => {
        calender.value = dates.randomDateString();
        localStorage.setItem(calenderDateKey, calender.value);
        search();
    }

    nationalRadio.onchange = e => {
        localStorage.setItem(radioSelectKey, "national");
        nytimes.useNational();
        search();

    }
    worldRadio.onchange = e => {
        localStorage.setItem(radioSelectKey, "world");
        nytimes.useWorld();
        search();
    }
}

function localStorageHandler() {
    //LOCAL STORAGE
    if (typeof (Storage) !== "undefined") {

        if (localStorage.getItem(calenderDateKey)) {
            calender.value = localStorage.getItem(calenderDateKey);
        }
        else {
            calender.value = dates.yesterday();
        }

        if (localStorage.getItem(giphySettingKey)) {
            giphyToggleButton.dataset.showing = localStorage.getItem(giphySettingKey);
        }
        else {
            giphyToggleButton.dataset.showing = "no";
        }

        if (localStorage.getItem(radioSelectKey)) {
            if (localStorage.getItem(radioSelectKey) == "world") {
                nytimes.useWorld();
            } else {
                nytimes.useNational();
            }
        }
        else {
            nytimes.useNational();
        }

    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }

}