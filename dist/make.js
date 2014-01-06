/*! make - v0.0.1 - 2014-01-06
* https://github.com/giang12/make.js
* Copyright (c) 2014 Giang Nguyen (http://giang.is); Licensed MIT */
(function (window, undefined) {

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
        var numString = num.toString().split("");

        if (numString.length > MAX)
            throw new Error("Out of Bound");
        //Special cases
        if(num == '0')
			return "zero";
        if(numString[0] == "-"){
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
            result = secondPart;
        else if (secondPart === "")
            result = firstPart;
        else if (and)
            result = firstPart + " and " + secondPart;
        else
            result = firstPart + " " + secondPart;

        return result;
    }
    

    window.make = typeof window.make === "object" ? window.make : {};

    window.make.numberToWord = numberToWord;
    return window;

})(window || this);






(function (window, undefined) {

    function formatTime(ms){
        return{
            milliseconds : Math.floor % 1000 || 0,
            seconds : Math.floor(ms / 1000) % 60 || 0,
            minutes : Math.floor(ms / (1000 * 60)) % 60 || 0,
            hours : Math.floor(ms / (1000 * 60 * 60)) % 24 || 0,
            days : Math.floor(ms / (1000 * 60 * 60 * 24)) || 0
        };
   
    }

    window.make = typeof window.make === "object" ? window.make : {};

    window.make.formatTime = formatTime;

})(window || this);
