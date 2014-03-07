/*! make - v0.0.1 - 2014-03-06
* https://github.com/giang12/make.js
* Copyright (c) 2014 Giang Nguyen (http://giang.is); Licensed MIT */
(function(window, undefined) {

        // Map over jQuery in case of overwrite
        var _previousMakeOwner = window.make;

        // top level name space
        var make = {};

        //version in sync with package json
        make.VERSION = '0.0.1';

        //exposing
        if (typeof module === "object" && module && typeof module.exports === "object") {
            module.exports = make;
        } else {
            if (typeof define === "function" && define.amd) {
                define("make", [], function() {
                    return make;
                });
            }
        }

        if (typeof window === "object") {
            window.make = make;
        }

        //return ownership to previous owner of make namespace and return make object
        make.noConflict = function() {
            window.make = _previousMakeOwner;
            return this;
        };
(function(window, undefined) {

    var oneTo19 = ["", "one", "two",
        "three", "four", "five", "six",
        "seven",
        "eight", "nine", "ten", "eleven",
        "twelve", "thirteen", "fourteen",
        "fifteen", "sixteen", "seventeen",
        "eighteen", "nineteen"
    ];
    var multipleTens = ["", "ten", "twenty",
        "thirty", "forty", "fifty", "sixty",
        "seventy", "eighty", "ninety"
    ];
    var magnitude = ["", "thousand",
        "million", "billion", "trillion",
        "quadrillion", "quintillion",
        "sextillion", "septillion",
        "octillion",
        "nonillion", "decillion",
        "undecillion", "duodecillion",
        "tredecillion",
        "quattuordecillion",
        "quindecillion", "sexdecillion",
        "septdecillion",
        "octdecillion", "novemdecillion",
        "vigintillion"
    ];

    var MAX = magnitude.length * 3;

    function numberToWord(num, and) {

        and = typeof and === "boolean" ? and : false;
        var numString = Math.floor(num).toString().split("");

        if (num.toString().split("").length > MAX)
            throw new Error("Out of Bound");

        //Special cases
        if (num == '0')
            return "zero";
        if (numString[0] == "-") {
            numString.shift();
            return "negative " + numberToWord(numString.join(""));
        }

        //General cases
        var arr = [];

        while (numString.length) {
            arr.push(parseInt(numString.splice(-3, 3).join(""), 10));
        }
        var result = "";
        var step = 0;

        if (arr.length && and) {
            result = _convertHundredToWord(arr.shift(), and) + (magnitude[step] ===
                "" ? "" : " " + magnitude[step]) + (result === "" ? result :
                " " + result);
            step++;
        }
        while (arr.length) {
            result = _convertHundredToWord(arr.shift()) + (magnitude[step] === "" ?
                "" : " " + magnitude[step]) + (result === "" ? result : " " +
                result);
            step++;
        }

        return result;
    }

    function _convertHundredToWord(num, and) {

        if (typeof num !== "number")
            throw new Error("Unexpected Argument");
        if (num > 1999)
            throw new Error("Out of Bound");

        and = typeof and === "boolean" ? and : false;
        var hundred = Math.floor(num / 100),
            ten = Math.floor(num / 10) % 10,
            unit = num % 10;

        var firstPart = hundred > 0 ? oneTo19[hundred] + " hundred" : "";
        var secondPart = ten < 2 ? oneTo19[10 * ten + unit] : multipleTens[
            ten] + oneTo19[unit];

        var result;
        if (firstPart === "")
            result = and ? "and " + secondPart : secondPart;
        else if (secondPart === "")
            result = firstPart;
        else if (and)
            result = firstPart + " and " + secondPart;
        else
            result = firstPart + " " + secondPart;

        return result;
    }


    function gcd(numArr) // numArr is an integer array (e.g. [57,0,-45,-18,90,447])
    {

        if (Object.prototype.toString.call(numArr) !== '[object Array]') {

            if (typeof numArr === "number") {
                numArr = [numArr];
            } else {
                throw new Error("Unexpected Argument");

            }
        }

        var n = numArr.length,
            x = numArr[0] < 0 ? -numArr[0] : numArr[0];
        for (var i = 1; i < n; i++) {
            var y = numArr[i] < 0 ? -numArr[i] : numArr[i];
            while (x && y) {
                if (x > y) {
                    x %= y;
                } else {
                    y %= x;
                }
            }
            x += y;
        }
        return x; //3
    }

    function lcm(numArr) {

        if (Object.prototype.toString.call(numArr) !== '[object Array]' || numArr.length < 2) {
            throw new Error("Unexpected Argument");
        }

        if (numArr.length === 2) {
            return (numArr[0] * numArr[1] / gcd(numArr));
        } else {
            var first = numArr[0];
            numArr.shift();
            return lcm([first, lcm(numArr)]);
        }

    }

    window.make = typeof window.make === "object" ? window.make : {};

    window.make.numberToWord = numberToWord;
    window.make.gcd = gcd;
    window.make.lcm = lcm;

    return window;

})(window || this);
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
                    milliseconds: ms % 1000 || 0,
                    seconds: Math.floor(ms / ms2s) % 60 || 0,
                    minutes: Math.floor(ms / s2m) % 60 || 0,
                    hours: Math.floor(ms / m2h) % 24 || 0,
                    days: Math.floor(ms / h2d) || 0
                };
        }

    }

    //hook to global make namespace
    window.make = typeof window.make === "object" ? window.make : {};
    //add public interface
    window.make.formatTime = formatTime;
    window.make.timeDiff = timeDiff;

})(window || this);
})(this);