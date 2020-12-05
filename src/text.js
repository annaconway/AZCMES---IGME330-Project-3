const loadingText =
[
    "Finding meaning in the numbers",
    "Seeing through the lies",
    "Consulting the lizard people",
    "Connecting the dots",
    "Listening to the voices in our heads"
]

const crazyText = 
[
    "Conncidence? Unlikely.",
    "Anyone could see the alien influence."
]

const concuranceText = 
[
    " mere moments after ",
    " within 24 hours of ",
    " at the same time as ",
    " and at the exact same moment ",
    " within seconds "
]


function randomElement(list)
{
    return list[Math.floor(Math.random() * list.length)];
}

function getLoadingText()
{
    return randomElement(loadingText) + "...";
}

function formatFinalString(spaceText, worldText)
{
    return spaceText + randomElement(concuranceText) + worldText + randomElement(crazyText);
}

export {getLoadingText, formatFinalString};