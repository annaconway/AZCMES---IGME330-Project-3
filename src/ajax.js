import * as utils from './utils.js'


function getJSON(url, callback) {
    let xhr = new XMLHttpRequest();

    xhr.onload = (e) => {
        let response = e.target.responseText;
        if (response == "") {
            callback({});
            return;
        }
        callback(JSON.parse(response));
    };
    xhr.open("GET", url);
    xhr.send();
}

function dataLoaded(e) {
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);

    // FAIL
    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No results for '" + displayTerm + "'</b>";
        return;
    }

    // RETURN
    let results = obj.data;
    console.log("results.length = " + results.length);
    let bigString = "<p><i>Here are " + results.length + " results for '" + displayTerm + "'</i> (Start = " + (offset - limit + 1) + " End = " + offset + ")</p>";

    // RESULTS
    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        let smallURL = result.images.fixed_width_small.url;
        if (!smallURL) smallURL = "images/no-image-found.png";

        let url = result.url;

        let line = `<div class='result'><img src = '${smallURL}' title= '${result.id}' />`;
        line += `<span><a target='_blank' href='${url}'>View on Giphy</a></span></div>`;

        bigString += line;
    }

    // ADD RESULTS TO PAGE
    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<b>Success!</b>";
}

function getGiphy(url) {
    let xhr = new XMLHttpRequest();
    xhr.onload = loadGiphy;
    xhr.open("GET", url);
    xhr.send();
}

function loadGiphy(e) {
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);

    // FAIL
    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b> No results found for '" + displayTerm + "'</b>";
        return;
    }

    // RETURN
    let results = obj.data;
    let bigString = "";

    // RANDOM GIF
    let result = results[Math.trunc(utils.getRandom(0, results.length))];
    console.log(Math.trunc(utils.getRandom(0, results.length)));
    let smallURL = result.images.fixed_height.url;

    if (!smallURL) smallURL = "images/no-image-found.png";

    let url = result.url;
    let rating = result.rating.toUpperCase();

    let line = `<div class = 'result'><img src='${smallURL}' title= '${result.id}' />`;

    line += `<span > <a target='_blank' href='${url}'> View on Giphy</a></span>`;
    

    bigString += line;

    // ADD RESULTS TO PAGE
    console.log(bigString);
    
    let bg = document.querySelector("body");
    bg.style.backgroundImage = `url('${smallURL})`;
    bg.style.height = `100%`;
    bg.style.backgroundPosition = `center top`;
    bg.style.backgroundRepeat = `no-repeat`;
    bg.style.backgroundSize = `100% 100%`;
}

export { getJSON, getGiphy }