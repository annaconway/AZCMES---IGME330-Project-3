import * as spaceText from "./donki.js"
import * as giphy from "./giphy.js"
import * as dates from "./dates.js"

let textBox, calender, searchButton; 

export function init()
{
    textBox = document.querySelector("#return");
    calender = document.querySelector("#start");
    searchButton = document.querySelector("#search");

    function loadData()
    {
        let date = calender.value;
        spaceText.getSolarEventText(dates.addDays(date,-1),date,(text) => {textBox.innerHTML = text});
    }
    calender.onchange = loadData;
    calender.value = "2020-01-22";
    loadData();

    textBox.innerHTML = 'loading space data...';

    setUpUI();
}

function setUpUI(){    

    searchButton.onclick = e => {
        giphy.generateGif();
    }

}