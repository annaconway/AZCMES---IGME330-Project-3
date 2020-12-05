import * as ajax from './ajax.js'

const donkiLink = "https://people.rit.edu/mes3585/330/project3/php/donki-proxy.php";

const eventTypes = [
    {
        name : "Coronal Mass Ejection",
        abvr : "CME"
    },
    {
        name : "Geomagnetic Storm",
        abvr : "GST"
    },
    {
        name : "Interplanetary Shock",
        abvr : "IPS"
    },
    {
        name : "Solar Flare",
        abvr : "FLR"
    },
    {
        name : "Coronal Mass Ejection",
        abvr : "CME"
    },
    {
        name : "Magnetopause Crossing",
        abvr : "MPC"
    },
    {
        name : "Radiation Belt Enhancment",
        abvr : "RBE"
    }
]

function getSolarEventText(start,end,callback)
{
    function formatSolarText(json)
    {
        let keys = Object.keys(json);
        if(keys.length == 0)
        {
            callback("No solar activity was detected");
            return;
        }
        let event = json[keys[Math.floor(Math.random()*keys.length)]];
        console.log(event);
        callback("CME found at " + event.startTime, event.note);
    }
    ajax.getJSON(donkiLink + `?type=${eventTypes[0].abvr}&start=${start}&end=${end}`,formatSolarText);
    
}

export {getSolarEventText}