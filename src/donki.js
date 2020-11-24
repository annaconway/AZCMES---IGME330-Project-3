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
        let text = '';
        json.forEach(sEvent => {
            if('note' in sEvent)
            {
                text += "<p>" + sEvent.note + "</p>";
            }
        });
        callback(text);
    }
    ajax.getJSON(donkiLink + `?type=${eventTypes[0].abvr}&start=${start}&end=${end}`,formatSolarText);
    //ajax.getJSON("https://people.rit.edu/mes3585/330/project3/php/donki-proxy.php?type=CME&start=yyyy-MM-dd&end=yyyy-MM-dd",formatSolarText);
    
}

export {getSolarEventText}