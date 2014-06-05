/*=============================================
                    url.js
=============================================*/

(function(window, undefined) {

    _urlLocation = window.location;

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    function addURLParameter(key, value) {

        pathname = urlPathname();
        query = urlQuery();
        param = query.split("#").join('').split('&'); //this hard removing hashtag may be a problem what I dont give a fuck right now
        map = {};
        if (param[0] !== '' || param.length > 1) {
            for (x = 0; x < param.length; x++) {
                pair = param[x].split('=');
                map[pair[0]] = pair[1] ? pair[1] : '';
            }
        }
        map[key] = encodeURI(value); //encodeURIComponent(value);
        var result = '';
        for (var k in map) {

            result += result === '' ? (k + "=" + map[k]) : "&" + (k + "=" + map[k]);
        }
        history.pushState(null, '', pathname + "?" + result);
    }

    function urlLocation() {

        return _urlLocation;
    }

    function urlQuery() {

        return (typeof(urlLocation.search) === "undefined" ? "" : urlLocation.search.substring(1));
    }

    function urlHref() {

        return urlLocation.href;
    }

    function urlProtocol() {

        return urlLocation.protocol;
    }

    function urlPathname() {

        return (typeof(urlLocation.pathname) === "undefined" ? "" : urlLocation.pathname);
    }

    //hook to global make namespace
    window.make = typeof window.make === "object" ? window.make : {};
    //add public interface
    window.make.getURLParameter = getURLParameter;
    window.make.addURLParameter = addURLParameter;
    window.make.urlLocation = urlLocation;
    window.make.urlQuery = urlQuery;
    window.make.urlHref = urlHref;
    window.make.urlProtocol = urlProtocol;
    window.make.urlPathname = urlPathname;

})(window || this);