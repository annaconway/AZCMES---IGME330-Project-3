import * as ajax from './ajax.js'

const donkiLink = "https://people.rit.edu/mes3585/330/project3/php/donki-proxy.php";

const eventTypes = [
    {
        name: "Coronal Mass Ejection",
        abvr: "CME"
    },
    {
        name: "Geomagnetic Storm",
        abvr: "GST"
    },
    {
        name: "Interplanetary Shock",
        abvr: "IPS"
    },
    {
        name: "Solar Flare",
        abvr: "FLR"
    },
    {
        name: "Magnetopause Crossing",
        abvr: "MPC"
    },
    {
        name: "Radiation Belt Enhancment",
        abvr: "RBE"
    }
]

let expectedResults, results;
let textList, noteList;

function getSolarEventText(start, end, callback) {
    textList = [];
    noteList = [];
    expectedResults = 0;
    results = 0;

    function formatSolarText(json, eventName) {
        results += 1;

        //check for empty object
        if (Object.keys(json).length == 0) {
            if (expectedResults == results) {
                callback(textList, noteList);
            }
            return;
        }

        json.forEach(event => {
            textList.push("A " + eventName + " was spotted at " + event.startTime);
            noteList.push(event.note);
        })

        if (expectedResults == results) {
            callback(textList, noteList);
        }
    }

    eventTypes.forEach(event => {
        let link = donkiLink + `?type=${event.abvr}&start=${start}&end=${end}`;
        ajax.getJSON(link, formatSolarText, event.name);
        expectedResults += 1;
    });

}

export { getSolarEventText }