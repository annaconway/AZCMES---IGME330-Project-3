import * as ajax from './ajax.js'

const giphyLink = "https://api.giphy.com/v1/gifs/search?";
const giphyKey = "w8MbJ5dGqRnlxJgwl92jmKtIcMd2rsN9";

let url, term, limit;

function generateGif()
{
   // BEGIN URL
   url = giphyLink;
   url += "api_key=" + giphyKey;

   // WHAT ARE WE SEARCHING?    
   url += "&q=" + "illuminati";

   ajax.getGiphy(url);
}

export {generateGif}