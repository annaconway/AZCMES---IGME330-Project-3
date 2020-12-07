import * as utils from './utils.js'

// Performs xhr request at the given url, and parses to a js object
// Info is used to pass additional info between callbacks
function getJSON(url, callback,info = null) {
    let xhr = new XMLHttpRequest();

    xhr.onload = (e) => {
        let response = e.target.responseText;
        if (response == "") {
            callback({});
            return;
        }
        //pass additional params if given
        if(info != null)
        {
            callback(JSON.parse(response),info);
        }
        else
        {
            callback(JSON.parse(response));
        }
    };
    xhr.open("GET", url);
    xhr.send();
}

// Gets a gif from from the given url
function getGiphy(url) {
    let xhr = new XMLHttpRequest();
    xhr.onload = loadGiphy;
    xhr.open("GET", url);
    xhr.send();
}

// Loads and formats a gif to be used as the backgroud for the app
function loadGiphy(e) {
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);

    // FAIL
    if (!obj.data || obj.data.length == 0) {
        console.log("fail");
        return;
    }

    // RETURN
    let results = obj.data;
    let bigString = "";

    // RANDOM GIF
    let result = results[Math.trunc(utils.getRandom(0, results.length))];
    let smallURL = result.images.fixed_height.url;

    if (!smallURL) smallURL = "images/no-image-found.png";

    let url = result.url;
    let rating = result.rating.toUpperCase();

    let line = `<div class = 'result'><img src='${smallURL}' title= '${result.id}' />`;

    line += `<span > <a target='_blank' href='${url}'> View on Giphy</a></span>`;    

    bigString += line;

    // ADD RESULTS TO PAGE    
    let bg = document.querySelector("body");
    bg.style.backgroundImage = `url('${smallURL})`;
    bg.style.height = `100%`;
    bg.style.backgroundPosition = `center top`;
    bg.style.backgroundRepeat = `no-repeat`;
    bg.style.backgroundSize = `100% 100%`;
}

export { getJSON, getGiphy }