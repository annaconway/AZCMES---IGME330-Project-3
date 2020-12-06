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
        "Anyone could see the alien influence that cause this.",
    ]

const concuranceText =
    [
        " mere moments after ",
        " within 24 hours of ",
        " at the same time as ",
        " and at the exact same moment ",
        " within seconds "
    ]

const sameDayText = 
[
    "On the very same day, ",
]

function randomElement(list) {
    return list[Math.floor(Math.random() * list.length)];
}

class TextGenerator {

    constructor (spaceEventList, worldEventList)
    {
        this.spaceEvents = spaceEventList;
        this.worldEvents = worldEventList;

        this.currentIndex = 0;
        this.maxIndex = Math.min(this.spaceEvents.length-1, this.worldEvents.length-1);
    }

    loading() {
        return randomElement(loadingText) + "...";
    }

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