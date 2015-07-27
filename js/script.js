FTS.ready(window, function() {
    
    alert('the document is ready to go!');
    
    /*
        Get URL Parameters
    */
    
    var params = FTS.getUrlParameters(window.location);
    
    console.log(params);
    
    /*
       Check if a number is even
    */
    
    var value = 4;
        
    if(FTS.isEven(value)) {
    
        console.log('The inputted value of ' + value + ' is an even number');
    
    } else {
    
        console.log('The inputted value of ' + value + ' is an odd number');
    
    }
    
    /*
        check if a number is positive
    */
    
    var number = 9;
    
    if (FTS.isPositive(number)) {
       console.log('The inputted value of ' + number + ' is a positive number'); 
    } else {
        console.log('The inputted value of ' + number + ' is a negative number');
    }
    
    /*
        get object size
    */
    
        var data = {
            'name': 'tim',
            'hands': 'fair-to-middlin',
            'hair': 'for now'
        };
        
        console.log('The object size of "data" is: ' + FTS.getObjectSize(data));
        
    /*
        Strip HTML
    */
    
    var fragment = "<p>This imputted fragment was ripe with HTML before it was removed with FTS.stripHtml()</p> <p>Well, so is this.</p>";
    
    console.log(FTS.stripHtml(fragment));
    
    /*
        Store data
    */
    
    FTS.store("newOneForTesting", "Oh come on - this information was saved with FTS.store()");
    
    var savedData = FTS.store('newOneForTesting');
    
    console.log(savedData);
    
    /*
        Sort By data-category
    */
    
    FTS.groupDomElements({

        'containerId' : 'wrapper',
        'groupingAttr' : 'data-category',
        'wrapGroups' : true,
        'groupingClass' : 'group',
        'prefix' : 'after-sort-',
        'wrappingElement': 'span'
        
    }, function () {
    
        console.log('elements have been grouped and sorted in the DOM');
    
    });
    
    /*
        get device orientation
    */
    
    if( FTS.getOrientation() ) {
        alert( FTS.getOrientation() );
    }
    
    /*
        script loader
    */
    FTS.loadScript('toload.js', function () {
        console.log('The script was loaded withe FTS.loadScript()');
    });
    
    /*
        Touch detection
    */
    
    if(FTS.isTouchDevice()) {
        console.log('touch me');
    } else {
        console.log('keep your damn hands off me');
    }
    
    /*
        Event binding
    */
    
    var button = document.getElementById('button');
    
    FTS.on(button, "click", function(){
        alert('event!');
    });

});
