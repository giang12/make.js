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