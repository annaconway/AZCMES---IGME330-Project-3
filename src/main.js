import * as spaceText from "./donki.js"
let textBox;
let calender;

export function init()
{
    textBox = document.querySelector("#return");
    //spaceText.getSolarEventText((text) => {textBox.innerHTML = text});

    calender = document.querySelector("#start");
    textBox.innerHTML = calender.value;
}
