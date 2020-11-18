import * as ajax from './ajax.js'

const donkiLink = "https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/";

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

function getSolarEventText(callback)
{
    let json = {name : "temp/fakedata"}//ajax.getJSON(donkiLink + eventTypes[0].abvr);
    callback(json.toString());
}

export {getSolarEventText}