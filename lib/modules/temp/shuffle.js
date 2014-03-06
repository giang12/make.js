(function(window, undefined) {

    /*To shuffle an array a of n elements(indices 0..n - 1): for i from n− 1 downto 1 do
    j← random integer with 0≤ j≤ i
exchange a[j] and a[i]
*/

    function shuffle(array) {

        if (!array instanceof Array)
            throw new Error("Unexpected Argument");

        var result = array.slice(0);
        var randNum;

        for (var x = result.length - 1; x > 0; x--) {
            randNum = Math.floor((Math.random() * 10))
        }

        return result;

    }
    //hook to global make namespace
    window.make = typeof window.make === "object" ? window.make : {};
    //add public interface
    make.shuffle = shuffle;

})(window || this);