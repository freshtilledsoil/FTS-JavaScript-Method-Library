/*
    Project: Fresh Tilled Soil JavaScript Method Library
    Created on: 8/6/2012
    Version: 0.02
    License: MIT, http://www.opensource.org/licenses/MIT
*/

// declare the FTS namespace
var FTS = FTS || {};

/*
    polyfills
*/

//  support for indexOf in IE8 and below
if (!Array.indexOf) {

    Array.prototype.indexOf = function (obj, start) {

        'use strict';

        var len = this.length,
            i;

        for (i = (start || 0); i < len; i = i + 1) {

            if (this[i] === obj) {

                return i;

            }
        }

        return -1;
    };

} // end indexOf

// don't break console in unsupported browsers
if (console.log === 'undefined') {

    // if console.log is undefined, manually build the log object so it doesn't error out
    var console = {
        log: function () {

             // nothing here, just making sure there's no error thrown
            'use strict';

        }
    };
} // end console

/*
    FTS Method library
*/

FTS = {
    
    isMobile : {

        Android: function () {
            'use strict';
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            'use strict';
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            'use strict';
            return navigator.userAgent.match(/iPhone|iPod/i);
        },
        Opera: function () {
            'use strict';
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            'use strict';
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            'use strict';
            return (FTS.isMobile.Android() || FTS.isMobile.BlackBerry() || FTS.isMobile.iOS() || FTS.isMobile.Opera() || FTS.isMobile.Windows());
        }

    },
    
    setCookie : function (c_name, value) {

        'use strict';

        var exDays = 7, // manually set the expiration date to 7 days
            exDate = new Date(),
            c_value;

        exDate.setDate(exDate.getDate() + exDays);
        c_value = escape(value) + ((exDays === null) ? '' : '; expires=' + exDate.toUTCString());
        document.cookie = c_name + '=' + c_value;

    },

    getCookie : function (c_name) {

        'use strict';

        // get the cookies and initialize some variables
        var i,
            x,
            y,
            ARRcookies = document.cookie.split(';'),
            ARRcookieslength = ARRcookies.length;

        // loop through the cookie array
        for (i = 0; i < ARRcookieslength; i = i + 1) {

            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
            x = x.replace(/^\s+|\s+$/g, '');

            if (x === c_name) {

                return unescape(y);

            }

        }

    },

    isTouchDevice : function () {

        if ('ontouchstart' in document) {

            return true;

        } else {

            return false;

        }

    },

    localStorageSupported : function () {

        'use strict';

        var uid = new Date(),
            result;

        try {

            // set and pull a unique localStorage item to test support
            localStorage.setItem(uid, uid);
            result = localStorage.getItem(uid) === String(uid);
            localStorage.removeItem(uid); // remove it so we're not wasting space
            return result && localStorage;

        } catch(e) {}

    },

    getUrlParameters : function (url) {

        'use strict';

        // initialize the array & variables
        var query_string = {},
            query,
            q,
            pair,
            arr,
            vars,
            varsLength,
            typeTest;

        // get current url if nothing passed in
        if (typeof url === 'undefined') {

            if (window.location.search !== '') {

                query = window.location.search;

            } else {

                return 'undefined';

            }

        }

        // check if the value is a string or a URL from the address bar
        if (typeof url === 'string') {

            query = url.split('?')[1];

        } else {

            query = url.search.substring(1);

        }

        // split the remaining string/object at the ampersands and dump them into an array
        vars = query.split('&');
        varsLength = vars.length;

        // loop through the array and push to a secondary array with key/value matching to access each object
        for (q = 0; q < varsLength; q = q + 1) {

            // split each pair at the = size
            pair = vars[q].split('=');
            typeTest = typeof (query_string[pair[0]]);

            if (typeTest === 'undefined') {

                query_string[pair[0]] = pair[1];

            } else if (typeTest === 'string') {

                arr = [ query_string[pair[0]], pair[1] ];
                query_string[pair[0]] = arr;

            } else {

                // push the pairing into the query_string array
                query_string[pair[0]].push(pair[1]);

            }

        }

        return query_string;

    }, // end getURLParameters() method

    isEven : function (value) {

        'use strict';

        if (value !== 'undefined') {

            if (value % 2 === 0) {

                return true;

            }

        }

    }, // end even number check

    isPositive : function (value) {

        'use strict';

        if (value !== 'undefined') {

            if (value > 0) {

                return true;

            }

        }

    }, // end positive number check

    getObjectSize : function (obj) {

        'use strict';

        var size = 0,
            key;

        for (key in obj) {

            if (obj.hasOwnProperty(key)) {

                size = size + 1;

            }

        }

        return size;

    }, // End getObjectSize

    stripHtml : function (fragment) {

        'use strict';

        var tmp = document.createElement('div');

        tmp.innerHTML = fragment;

        return tmp.textContent || tmp.innerText;

    }, // End strip html

    store : function (namespace, data) {

        'use strict';

        var store,
            results;

        if (FTS.localStorageSupported() && JSON) {

            // use localStorage if supported
            if (arguments.length > 1) {

                results = localStorage.setItem(namespace, JSON.stringify(data));

            } else {

                store = localStorage.getItem(namespace);
                results = (store && JSON.parse(store)) || [];

            }

        } else {

            // otherwise, store data in a cookie
            if (arguments.length > 1) {

                results = FTS.setCookie(namespace, data);

            } else {

                store = FTS.getCookie(namespace);
                results = (store) || [];

            }

        }

        return results;

    }, // End store data method

    groupDomElements : function (options, callback) {

        'use strict';

        var defaults = {
            'containerId' : null,
            'groupingAttr' : 'data-category',
            'wrapGroups' : false,
            'groupingClass' : null,
            'prefix' : 'fts-sort-',
            'wrappingElement': 'div'
        },
        directParent,
        wrappingElement,
        attrElemList,
        attrElemLength,
        parentElement,
        elemArray = [],
        dupeArray= [],
        sortedAttrList= [],
        domListingArray = [],
        h,
        i,
        j,
        k,
        l;

        // map all default settings to user defined options

        for (h in defaults) {

            if (defaults.hasOwnProperty(h)) {

                if (typeof(options[h]) === 'undefined') {

                    options[h] = defaults[h];

                } // end typeof

            } // end hasOwnProperty

        } // end for in

        if (options.containerId !== null && options.groupingAttr !== null) {

            wrappingElement = document.getElementById(options.containerId);

           if (document.querySelectorAll) {

               attrElemList = wrappingElement.querySelectorAll('[' + options.groupingAttr + ']');

           } else {

               alert('no support for this sorting feature');

           }

           attrElemLength = attrElemList.length;
           parentElement = attrElemList[0].parentNode;

           if (attrElemLength > 0) {

               // push elements into a common array to be sorted
               for (i = 0; i < attrElemLength; i = i + 1) {

                   elemArray.push(attrElemList[i]);

               }

               // sort array items alphabetically by
               elemArray = elemArray.sort(function (a, b) {

                    var nameA = a.getAttribute(options.groupingAttr),
                        nameB = b.getAttribute(options.groupingAttr);

                    if (nameA < nameB) {

                        return -1;

                    } else if (nameA > nameB) {

                        return 1;

                    } else {

                        return 0;

                    }

               });

               // Put sorted nodes back in to the DOM
               for (j = 0; j < elemArray.length; j = j + 1) {

                    sortedAttrList.push(elemArray[j].getAttribute(options.groupingAttr));
                    parentElement.appendChild(elemArray[j]);
               }


               if (options.wrapGroups) {

                   // build out the array listing
                   for (k = 0; k < sortedAttrList.length; k = k + 1) {

                       if (sortedAttrList[k] !== sortedAttrList[k + 1]) {

                           domListingArray.push(sortedAttrList[k]);

                       }

                   }

                   // add divs to the DOM from array elements
                   for (l = 0; l < domListingArray.length; l = l + 1) {

                       var newEl = document.createElement(options.wrappingElement);

                       newEl.id = options.prefix + domListingArray[l];
                       newEl.setAttribute('class', options.groupingClass);

                       parentElement.appendChild(newEl);

                   }

                   // add grouped elements to the DOM
                   for (j = 0; j < elemArray.length; j = j + 1) {

                       var sortingIdReference = elemArray[j].getAttribute(options.groupingAttr),
                           targetSortedDiv = document.getElementById(options.prefix + sortingIdReference);

                       targetSortedDiv.appendChild(elemArray[j]);
                   }

               } // end if wrapping

           } // end attrElemLength

        } // end null check

        // make sure the callback is indeed a function before executing it
        if (typeof(callback) === 'function') {

            callback.call(this);

        } // end check

    },

    getOrientation : function () {

        'use strict';

        if (FTS.isTouchDevice()) {

            if (orientation === 0 || orientation === 180) {

                return 'portrait';

            } else if (orientation === 90 || orientation === -90) {

                return 'landscape';

            } else {

                return false;

            }

        }

    }, // end groupDomElements method

    loadScript : function (path, callback) {

        'use strict';

        var script = document.createElement('script');
        
        FTS.on(script, 'load', function(){
            
            if (typeof(callback) === 'function') {
                callback.call(this);
            }
            
        });
        
        /*
        
        Removing this until proper testing is done for FTS.on with async loading
        
        if (script.addEventListener) {

            script.addEventListener('load', function () {

                if (typeof(callback) === 'function') {

                    callback.call(this);

                }

            }, false);

        } else {

            script.onreadystatechange = function () {

                if (script.readyState === 'loaded' || script.readyState === 'complete') {

                    if (typeof(callback) === 'function') {

                        callback.call(this);

                    } // end check

                    script.onreadystatechange = null;
                }

            };
        }
        
        */

        script.src = path;
        document.getElementsByTagName('head')[0].appendChild(script);

    }, // end loadScript()

    on : function (el, eventName, eventHandler) {
        
        'use strict';
        
        if (el.addEventListener){
        
            // normal event listener
            el.addEventListener(eventName, eventHandler, false); 
        
        } else if (el.attachEvent){
        
            // fallback support for IE8 and below
            el.attachEvent('on' + eventName, eventHandler);
        
        }
        
    }, // end on event method
    
    off : function (el, eventName, eventHandler) {

        'use strict';
        
        if (el.removeEventListener) {
            
            // normal event listener
            el.removeEventListener(eventName, eventHandler, false);
            
        } else if (el.detachEvent) {
        
            // fallback support for IE8 and below
            el.detachEvent('on' + eventName, eventHandler);
        
        }

    }, // end off event method
    
    ready : function (win, fn) {

        /* originally from: https://github.com/dperini/ContentLoaded */

        var done = false,
            top = true,
            doc = win.document,
            root = doc.documentElement,
            add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
            rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
            pre = doc.addEventListener ? '' : 'on',

            init = function(e) {
                if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
                (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
                if (!done && (done = true)) fn.call(win, e.type || e);
            },

            poll = function() {
                try {
                    root.doScroll('left');
                } catch(e) {
                    setTimeout(poll, 50); return;
                }
                init('poll');
            };

        if (doc.readyState == 'complete') { 
            fn.call(win, 'lazy');
        } else {
            if (doc.createEventObject && root.doScroll) {
                try { top = !win.frameElement; } catch(e) { }
                if (top) poll();
            }

            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }

    } // end ready event

}; /* end FTS namespace */