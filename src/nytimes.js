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
        let articles = [];
        let links = [];
        for(let i = 0; i < numArticles; i++)
        {
            articles.push(json.response.docs[i].abstract);
            links.push(json.response.docs[i].web_url);
        }
        callback(articles,links);
    }
    ajax.getJSON(nytURL + fliterStart + date + ")" + key, formatArticleInfo);
}

export{getWorldEventText}