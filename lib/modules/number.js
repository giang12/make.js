/*=============================================
                number.js
=============================================*/

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


    function gcd(numArr, optNum) // numArr is an integer array (e.g. [57,0,-45,-18,90,447])
    {

        if (Object.prototype.toString.call(numArr) !== '[object Array]') {

            if (typeof numArr === "number") {
                numArr = [numArr];
            } else {
                throw new Error("Unexpected Argument");

            }

            if (typeof optNum === "number") {
                numArr.push(optNum);
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

    function lcm(numArr, optNum) {

        if (Object.prototype.toString.call(numArr) !== '[object Array]') {

            if (typeof numArr === "number") {
                numArr = [numArr];
            } else {
                throw new Error("Unexpected Argument");

            }
            if (typeof optNum === "number") {
                numArr.push(optNum);
            }

        }

        if (numArr.length < 2) {
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