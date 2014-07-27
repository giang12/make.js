/*=============================================
                    time.js
=============================================*/

(function(window, undefined) {

    var ms2s = 1000,
        s2m = ms2s * 60,
        m2h = s2m * 60,
        h2d = m2h * 24;

    function timeDiff(time1, time2, op) {

        if (typeof time1 === "object")
            time1 = time1.getTime();
        if (typeof time2 === "object")
            time2 = time2.getTime();
        if (typeof time1 !== "number" || typeof time2 !== "number")
            throw new Error("Unexpected Argument");

        if (time1 < time2)
            return formatTime(time2 - time1, op);

        return formatTime(time1 - time2, op);
    }

    function formatTime(ms, op) {

        if (typeof ms !== "number")
            throw new Error("Unexpected Argument");

        milliseconds = ms % 1000 || 0;
        seconds = Math.floor(ms / ms2s) % 60 || 0;
        minutes = Math.floor(ms / s2m) % 60 || 0;
        hours = Math.floor(ms / m2h) % 24 || 0;
        days = Math.floor(ms / h2d) || 0;
        stringFormatted = (days !== 0 ? days + (days > 1 ? " days " : " day ") : "") +
            (hours !== 0 ? hours + (hours > 1 ? " hours " : " hour ") : "") +
            (minutes !== 0 ? minutes + (minutes > 1 ? " minutes " : " minute ") : "") +
            (seconds !== 0 ? seconds + (seconds > 1 ? " seconds " : " second ") : "");
        switch (op) {

            case "s":
            case "second":
            case "seconds":
                return ms / ms2s;

            case "m":
            case "min":
            case "mins":
            case "minute":
            case "minutes":
                return ms / s2m;

            case "h":
            case "hour":
            case "hours":
                return ms / m2h;

            case "d":
            case "day":
            case "days":
                return ms / h2d;

            default:
                return {
                    milliseconds: milliseconds,
                    seconds: seconds,
                    minutes: minutes,
                    hours: hours,
                    days: days,
                    toString: function() {
                        return stringFormatted;
                    },
                };
        }

    }

    function timer(time, update, complete) {

        function Timer(t, u, c) {
            var start = new Date().getTime();
            var interval = setInterval(function() {
                var now = t - (new Date().getTime() - start);
                if (now <= 0) {
                    clearInterval(interval);
                    if (typeof c === "function") {
                        c();
                    }
                } else if (typeof u === "function") {
                    u(Math.floor(now / 1000));

                }
            }, 100); // the smaller this number, the more accurate the timer will be
            this.clearTimer = function clearTimer() {
                clearInterval(interval);
            };
        }
        return new Timer(time, update, complete);
    }
    //hook to global make namespace
    window.make = typeof window.make === "object" ? window.make : {};
    //add public interface
    window.make.formatTime = formatTime;
    window.make.timeDiff = timeDiff;
    window.make.timer = timer;
})(window || this);