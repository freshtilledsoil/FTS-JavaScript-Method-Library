/*
    Project: Fresh Tilled Soil JavaScript Method Library
    Created: 8/6/2012
*/

// declare the FTS namespace
var FTS = FTS || {};

/*
    polyfills
*/

//  support for indexOf in IE8 and below
if (!Array.indexOf) {

    Array.prototype.indexOf = function (obj, start) {

        "use strict";

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
            "use strict";

        }
    };
} // end console

/*
    FTS Method library
*/

FTS = {

    setCookie : function (c_name, value) {

        "use strict";

        var exDays = 7, // manually set the expiration date to 7 days
            exDate = new Date(),
            c_value;

        exDate.setDate(exDate.getDate() + exDays);
        c_value = escape(value) + ((exDays === null) ? "" : "; expires=" + exDate.toUTCString());
        document.cookie = c_name + "=" + c_value;

    },

    getCookie : function (c_name) {

        "use strict";

        // get the cookies and initialize some variables
        var i,
            x,
            y,
            ARRcookies = document.cookie.split(";"),
            ARRlength = ARRcookies.length;
        
        // loop thought the cookie array
        for (i = 0; i < ARRlength; i = i + 1) {

            x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g,"");

            if (x === c_name) {
                return unescape(y);
            }
        }

    },
    isTouchDevice : function () {

        if('ontouchstart' in document) {
            return true;
        } else {
            return false;
        }

    },
    localStorageSupported : function () {

        "use strict";

        var uid = new Date(),
            result;

        try {
            // set and pull a unique localStorage item to test support
            localStorage.setItem(uid, uid);
            result = localStorage.getItem(uid) === uid;
            localStorage.removeItem(uid); // remove it so we're not wasting space
            return result && localStorage;

        } catch(e) {}

    },

    getUrlParameters : function (url) {

        "use strict";

        // initialize the array & variables
        var query_string = {},
            query,
            q,
            pair,
            arr,
            vars,
            varCount,
            typeTest;

        // check if the value is a string or a URL from the address bar
        if (typeof (url) === 'string') {
            query = url.split('?')[1];
        } else {
            query = url.search.substring(1);
        }

        // split the remaining string/object at the ampersands and dump them into an array
        vars = query.split('&');
        varCount = vars.length;

        // loop through the array and push to a secondary array with key/value matching to access each object
        for (q = 0; q < varCount; q = q + 1) {

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

        "use strict";

        if (value % 2 === 0) {

            return true;

        }

    }, // end even number check
    
    isPositive : function (value) {

        "use strict";

        if( value !== 'undefined') {

            if( value > 0 ) {

                return true;

            }

        }

    }, // end positive number check
    
    getObjectSize : function (obj) {
        
        "use strict";
        
        var size = 0,
            key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) { 
                size++;
            }
        }

        return size;

    }, // End getObjectSize
    
    stripHtml : function (fragment) {
        
        "use strict";
        
        var tmp = document.createElement("div");
        
        tmp.innerHTML = fragment;
   
        return tmp.textContent || tmp.innerText;

    }, // End strip html

    store : function (namespace, data){
        
        "use strict";
        
        var store,
            results;
        
        if(FTS.localStorageSupported && JSON) {
            
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

        "use strict";

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
        
        for ( h in defaults ) {
            if (defaults.hasOwnProperty(h)) {
                if( typeof(options[h]) === 'undefined' ) {
                    options[h] = defaults[h];
                } // end typeof
            } // end hasOwnProperty
        } // end for in
        
        if( options.containerId !== null && options.groupingAttr !== null ) {

            wrappingElement = document.getElementById(options.containerId);

           if( document.querySelectorAll ) {

               attrElemList = wrappingElement.querySelectorAll('[' + options.groupingAttr + ']');

           } else {

               alert('no support for this sorting feature');

           }

           attrElemLength = attrElemList.length;
           parentElement = attrElemList[0].parentNode;

           if( attrElemLength > 0 ) {

               // push elements into a common array to be sorted
               for (i = 0; i < attrElemLength; i = i + 1) {
                   elemArray.push(attrElemList[i]);
               }

               // sort array items alphabetically by
               elemArray = elemArray.sort( function (a, b) {

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
               
               if(options.wrapGroups) { 

                   // build out the array listing
                   for (k = 0; k < sortedAttrList.length; k = k + 1) {
                       if(sortedAttrList[k] !== sortedAttrList[k + 1]) {
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
        if( typeof(callback) === 'function' ) {

            callback.call(this);

        } // end check

    },
    getOrientation : function () {

        "use strict";

        if( FTS.isTouchDevice() ) {

            if(orientation === 0 || orientation === 180) {
                return 'portrait';
            } else if(orientation === 90 || orientation === -90) {
                return 'landscape';
            } else {
                return false;
            }

        }

    }, // end groupDomElements method
    loadScript : function (path, callback) {

        "use strict";

        var s = document.createElement("script");

        if(s.addEventListener) {

            s.addEventListener("load", function () {
                if( typeof(callback) === 'function' ) {
                    callback.call(this);
                }
            }, false);

        } else {

            s.onreadystatechange = function () {
                if(s.readyState === 'loaded' || s.readyState === 'complete') {

                    if( typeof(callback) === 'function' ) {
                        callback.call(this);
                    } // end check

                    s.onreadystatechange = null;
                }
            };
        } // end if/else

        s.src = path;
        document.getElementsByTagName('head')[0].appendChild(s);

    } // end loadScript()

}; /* end FTS namespace */