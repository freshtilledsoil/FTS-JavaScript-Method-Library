# FTS Javascript Method Library

Library lives in: <root>/js/lib/FTS.utilities.js


## To Do
- add querySelector polyfill for groupDomElements()
- add JSON polyfill for global
- create better documentation
- strategically order methods
- write tests

## Included Polyfills

### `indexOf()`
Use indexOf as normal.


### `console.log()`
Use console.log as normal. Doesn't log anything but prevents errors from being thrown.

# Library Methods

## `getURLParameters()`
    
This method takes 1 optional argument, which is the URL or string you want to parse. If no URL passed in, gets current URL's params. *Returns an object containing the URL parameters.*

Example:

    var params = FTS.getUrlParameters('http://example.com/?facialhair=mustache&sandwich=meatball');

    alert(params.facialhair); // returns 'mustache'
    alert(params.sandwich); // returns 'meatball'
        
## `isEven()`

This method takes 1 argument, which is the number you want to run the test against. *Returns boolean.*

Example:
    
    var val = 1;
    
    if (FTS.isEven(val)) {
    
        alert('this value is even');
    
    } else {
    
        alert('this value is odd');
    
    }
        
## `isPositive()`
    
This method takes 1 argument, which is the numner you want to function text against. *Returns boolean.*

Example:

    var val = 3;
    
    if (FTS.isPositive(val)) {
        
        alert('this a positive number');
        
    } else {
    
        alert('this is negative or 0');
    
    }
        
## `getObjectSize()`
    
This method takes 1 argument, which is the object you need to check the length of. It doesn't need to be used on everything, only when you can't use the .length notation. *Returns number.*
        
Example:
        
    var test = {
        'name': 'tim',
        'age': '107 years'
    };
    
    alert(FTS.getObjectSize(test)); // alerts '2'


## `stripHtml()`

This method removes all HTML from a fragment. *Returns cleaned content.*

Example: 
    
    var html = '<p>This is busy with HTML</p>';
    
    alert(FTS.stripHtml(html)); // alerts 'This is busy with HTML'
        
## `store()`
    
This method is used to store information in localStorage. It can take either 1 or 2 arguments. If 1, it is a "get", if 2, it is a "set". *Returns data from localStorage OR a cookie, whichever is supported.*
        
Example: 

    var data = 'string to save';
    
    // set
    FTS.store('saveMe', data);
    
    // get
    FTS.store('saveMe');
        
## `groupDomElements()`
        
This method will sort and/sort group DOM elements based on an attribute. It takes 2 arguments, which are an options object (like a jQuery plugin), and a callback function.
        
Example:

    FTS.groupDomElements({

        'containerId' : 'wrapper',
        'groupingAttr' : 'data-category',
        'wrapGroups' : true,
        'groupingClass' : 'group',
        'prefix' : 'after-sort-',
        'wrappingElement': 'span'
    
    }, function () {

        console.log('sorting is finished');

    });
        
## `getOrientation()`
*[in Alpha]*
    
Gets orientation of device. *Returns "portrait" or "landscape".*
        
Example:

    if (FTS.getOrientation()) {

        alert(FTS.getOrientation());

    }
        
## `loadScript()`
    
This method asynchronously loads a JS file into the head of the document. It takes 2 arguments: file path, callback function.
        
Example: 

    FTS.loadScript('js/touch-interactions.js', function () {

        alert('the script has been successfully loaded');

    });
        
## `isTouchDevice()`
        
This method will return true if support for touch interactions is detected, false otherwise. *Returns boolean.*

Example:

    if (FTS.isTouchDevice()) {

        alert('touch me');

    } else {

        alert('keep your damn hands off me');

    }
    
## `on() & off()`
        
This method provides cross browser event bindings and is also use internally*

Example:

    FTS.on(elem, 'click', function(){
        alert('the click');
    });
    
    FTS.off(elem, 'click', function(){
        alert('unbound!');
    });
    