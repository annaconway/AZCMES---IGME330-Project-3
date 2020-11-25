function getJSON (url, callback){
    let xhr = new XMLHttpRequest();

    xhr.onload = (e) => {
        let response = e.target.responseText;
        if(response == "")
        {
            callback({});
            return;
        }
        callback(JSON.parse(response));
    };
    xhr.open("GET",url);
    xhr.send();
}

function dataLoaded(e){
    let xhr = e.target;

    let obj = JSON.parse(xhr.responseText);

    if(!obj.data || obj.data.length == 0){
        document.querySelector("#status").innerHTML = "<b>No results for '" + displayTerm + "'</b>";
        return;
    }

    let results = obj.data;
    console.log("results.length = " + results.length);
    let bigString = "<p><i>Here are " + results.length + " results for '" + displayTerm + "'</i> (Start = "+ (offset - limit + 1) + " End = "+ offset + ")</p>";

    for(let i = 0; i < results.length; i++){
        let result = results[i];

        let smallURL = result.images.fixed_width_small.url;
        if(!smallURL) smallURL = "images/no-image-found.png";

        let url = result.url;

        let line = `<div class='result'><img src = '${smallURL}' title= '${result.id}' />`;
        line += `<span><a target='_blank' href='${url}'>View on Giphy</a></span></div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<b>Success!</b>";
}

export {getJSON}