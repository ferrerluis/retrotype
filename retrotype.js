function retrotype (strings, options={}) {
    options = {
        interval: options.interval || 2000,
        random: options.random || false,
        id: options.id || "retrotype",
        typeSpeed: options.typeSpeed || 200,
        deleteSpeed: options.deleteSpeed || 100
    };

    console.log(strings);
    console.log(options);
    
    var item = document.getElementById(options.id);

    console.log(item);
    
    item.innerHTML = strings[0];
    
    var i = 0;
    var numStrings = strings.length;
    var curString = strings[i];
    var nextString = strings[i+1];
    
    var flag = 1;
    var trueInterval = curString.length * options.deleteSpeed + nextString.length * options.typeSpeed + options.interval;
    
    console.log(i, numStrings);
        
    setInterval(function() {
        
            curString = strings[i];
            i = ++i % strings.length;   // Updating i
            nextString = strings[i];

            console.log(curString);
            console.log(nextString);

            // for (var j = curString.length - 1; j >= 0; j--) {
            for (var j = 0; j <= curString.length; j++) {                
                (function(length, index) {
                    setTimeout(function() {
                        
                        item.innerHTML = curString.substring(0, index);
                        
                    }, (length - index) * options.deleteSpeed);
                })(curString.length, j);
            } 
            
            setTimeout(function() {
               for (var j = 1; j <= nextString.length; j++) {
                    (function(index) {                
                        setTimeout(function() {
                            
                            item.innerHTML = nextString.substring(0, index);
                            
                        }, index * options.typeSpeed);
                    })(j);                
                } 
            }, curString.length * options.deleteSpeed);
            
    }, trueInterval);
}