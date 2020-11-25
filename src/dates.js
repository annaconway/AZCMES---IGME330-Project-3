
function stringToDate(str)
{
    let splitdate = str.split(/\D/);
    return new Date(Number(splitdate[0]),Number(splitdate[1])-1,Number(splitdate[2]));
}

function monthString(num)
{
    if(num < 10)
        return '0' + num;
    return num;
}

function dateToString(date)
{
    return `${date.getFullYear()}-${monthString(date.getMonth()+1)}-${date.getDate()}`;
}

function addDays(dateString,days)
{
    const msPerDay = 86400000;
    let dateObj = stringToDate(dateString);
    dateObj = new Date(dateObj.getTime() + msPerDay * days);
    return dateToString(dateObj);
}


export {addDays}