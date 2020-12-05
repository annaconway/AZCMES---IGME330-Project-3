import * as ajax from './ajax.js'

const nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
const fliterStart = "&fq=section_name:(\"World\") AND pub_date:("
const key = "&api-key=8iYDdnGGzxrl05WTA0GZWNdKMJjE3I5O";

function getWorldEventText(date, callback) {
    function formatArticleInfo(json) {
        let numArticles = json.response.docs.length;

        if (numArticles == 0) {
            callback("no signignificant events happened.");
            return;
        }
        let article = json.response.docs[Math.floor(Math.random() * numArticles)];
        let mainText = article.abstract;
        let additionalInfo = article.web_url;
        callback(mainText);
    }
    ajax.getJSON(nytURL + fliterStart + date + ")" + key, formatArticleInfo);
}

export{getWorldEventText}