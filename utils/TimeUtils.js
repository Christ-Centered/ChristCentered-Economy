// require

// functions
const functions = {
    getTimeStr: function(ms) {
        // get the amount of variable units of time from ms
        const days = Math.floor(ms / (24 * 60 * 60 * 1000));
        const daysms = ms % (24 * 60 * 60 * 1000);
        const hours = Math.floor((daysms) / (60 * 60 * 1000));
        const hoursms = ms % (60 * 60 * 1000);
        const minutes = Math.floor((hoursms) / (60 * 1000));
        const minutesms = ms % (60 * 1000);
        const seconds = Math.floor((minutesms) / (1000));

        // create the string variable
        let time = "";

        // convert the ms to readable text
        if (days > 0) {
            var str = " days";
            if (days == 1) str = " day";
            time = days + str;
        }

        if (hours > 0) {
            var str = " hours";
            if (hours == 1) str = " hour";
            if (time == "") time = hours + str;
            else time = `${time} ${hours}${str}`;

        }

        if (minutes > 0) {
            var str = " minutes";
            if (minutes == 1) str = " minute";
            if (time == "") time = minutes + str;
            else time = `${time} ${minutes}${str}`;
        }

        if (seconds > 0) {
            var str = " seconds";
            if (seconds == 1) str = " second";
            if (time == "") time = seconds + str;
            else time = `${time} ${seconds}${str}`;
        }

        return time;
    }
}

// export functions
module.exports = functions;