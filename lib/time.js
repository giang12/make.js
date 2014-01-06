
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
