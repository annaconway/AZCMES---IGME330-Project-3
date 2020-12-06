//turns a "yyyy-MM-dd" string to a date obj
function stringToDate(str)
{
    let splitdate = str.split(/\D/);
    return new Date(Number(splitdate[0]),Number(splitdate[1])-1,Number(splitdate[2]));
}

//adds a leading 0 to numbers < 10
function formatNum(num)
{
    if(num < 10)
        return '0' + num;
    return num;
}

////turns a js date obj to a "yyyy-MM-dd" string
function dateToString(date)
{
    return `${date.getFullYear()}-${formatNum(date.getMonth()+1)}-${formatNum(date.getDate())}`;
}

//adds days to a date obj, days can be negitive to go back in time
function addDays(dateString,days)
{
    const msPerDay = 86400000;
    let dateObj = stringToDate(dateString);
    dateObj = new Date(dateObj.getTime() + msPerDay * days);
    return dateToString(dateObj);
}

//returns a date string from the past year
function randomDateString()
{
    let today = new Date(Date.now());
    let randomDay = Math.floor(Math.random() * 365);
    return addDays(
        dateToString(today),
        -randomDay
        );
}

//returns a date string representing the day before today
function yesterday()
{   
    let today = new Date(Date.now()); 
    return addDays(
    dateToString(today),
    -1
    );
}


export {addDays, randomDateString, yesterday}