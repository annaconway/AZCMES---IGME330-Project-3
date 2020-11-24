import * as spaceText from "./donki.js"
let textBox;
let calender;

export function init()
{
    textBox = document.querySelector("#return");
    calender = document.querySelector("#start");
    let date = calender.value;
    let splitdate = date.split(/\D/);
    splitdate[1] = String(Number(splitdate[1])-1);
    let datePrevious = splitdate[0] + '-' + splitdate[1] + '-' + splitdate[2];
    spaceText.getSolarEventText("yyyy-MM-dd","yyyy-MM-dd",(text) => {textBox.innerHTML = text});
    textBox.innerHTML = 'loading space data...';
}
