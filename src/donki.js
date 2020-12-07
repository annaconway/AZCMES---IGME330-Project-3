import * as ajax from './ajax.js'

const donkiLink = "https://people.rit.edu/mes3585/330/project3/php/donki-proxy.php";

// Holds all solar events that donki supports and their corresponding abvr
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

// Expected results holds the number of responses expected from the donki proxy server,
// Results holds the number of results recived
let expectedResults, results;

// Text list holds all solar event text
// Notes holds all additional information returned by the api
let textList, noteList;

// Gets all available solar events in the range between the given start and end dates
// Start and end should be formated as "yyyy-MM-dd" strings
function getSolarEventText(start, end, callback) {
    textList = [];
    noteList = [];
    expectedResults = 0;
    results = 0;

    function formatSolarText(json, eventName) {
        //increment amount of results recived
        results += 1;

        //check for empty object
        if (Object.keys(json).length == 0) {
            console.log("empty");
            if (expectedResults == results) {
                callback(textList, noteList);
            }
            return;
        }

        //add all events to data structures
        json.forEach(event => {
            let str = "A " + eventName + " was spotted ";
            //add time if documented
            if(event.startTime != null)
                str += "at " + event.startTime;

            textList.push(str);

            if(event.note != null)
                noteList.push(event.note);
            else
                noteList.push("No additional information");
        })

        //all results recived, call the callback with data
        if (expectedResults == results) {
            callback(textList, noteList);
        }
    }

    //a seperate call to the api needs to be preformed for each solar event 
    eventTypes.forEach(event => {
        let link = donkiLink + `?type=${event.abvr}&start=${start}&end=${end}`;
        ajax.getJSON(link, formatSolarText, event.name);
        expectedResults += 1;
    });

}

export { getSolarEventText }