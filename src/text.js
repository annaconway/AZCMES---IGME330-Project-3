//arrays of possible text for each component of the final text
//loading text
const loadingText =
    [
        "Finding meaning in the numbers",
        "Seeing through the lies",
        "Consulting the lizard people",
        "Connecting the dots",
        "Listening to the voices in our heads"
    ]
//crazy text is added at the end of all final text, implies relationship between 
//two totally unrelated events
const crazyText =
    [
        "Conncidence? Unlikely.",
        "Anyone could see the alien influence that cause this.",
    ]
//used to transition from one event to the other
const concuranceText =
    [
        " mere moments after ",
        " within 24 hours of ",
        " at the same time as ",
        " and at the exact same moment ",
        " within seconds "
    ]
//used for subsequent events returned from the same search
const sameDayText = 
[
    "On the very same day, ",
]

//picks a random element from the given list
function randomElement(list) {
    return list[Math.floor(Math.random() * list.length)];
}

//creates most of the text for the application
//holds multiple events at the same time, events can be accesed with .next
class TextGenerator {

    constructor (spaceEventList, worldEventList)
    {
        this.spaceEvents = spaceEventList;
        this.worldEvents = worldEventList;

        this.currentIndex = 0;
        //max index is equal to the lesser of the two array lengths
        this.maxIndex = Math.min(this.spaceEvents.length-1, this.worldEvents.length-1);
    }

    //returns loading text
    loading() {
        return randomElement(loadingText) + "...";
    }

    //gets the next event, if all events have been seen then returns no results text
    next() {
        if(this.currentIndex <= this.maxIndex)
        {
            let string = "";
            if(this.currentIndex > 0)
                string += randomElement(sameDayText);
            string += this.spaceEvents[this.currentIndex] + randomElement(concuranceText);
            string += this.worldEvents[this.currentIndex] + randomElement(crazyText);
            this.currentIndex++;
            return string;
        }
        else
        {
            return "You've reached the bottom of the rabbit hole. Search on another date to find out more.";
        }
    }

}
export { TextGenerator };