function deleteString(string, element, speed) {
    
    var arr = string.split("");
    
    var interval = setInterval(function() {
        
        arr.pop();
        element.innerHTML = arr.join("");
        
    }, speed);
    
    setTimeout(function() {
        clearInterval(interval);
    }, string.length * speed);
    
    return interval;
}

function typeString(string, element, speed) {
    
    var arr = string.split("");
    var index = 0;

    var interval = setInterval(function() {
        
        element.innerHTML += arr[index];
        
        index++;
    }, speed);
    
    setTimeout(function() {
        clearInterval(interval);
    }, string.length * speed);
    
    return interval;
}

function clearIntervals(intervals) {
    for (var i = 0; i < intervals.length; i++) {
        clearInterval(intervals[i]);
    }
}

function clearTimeouts(timeouts) {
    for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
}

function objToArray(obj) {
    return Object.keys(obj).map(function (key) {return obj[key]});
}

function Cycle(arr) {
    this.arr = arr || [];
    this.length = function() { return arr.length };
    this.position = 0;
    this.get = function(index) { return this.arr[index || this.position] };
    this.next = function() {
        this.position = ++this.position % this.length();
        return this.get();
    };
    this.push = function(item) { this.arr.push(item) };
    this.pop = function() { return this.arr.pop() };
}

function retrotype (strings, options={}) {
    
    options = {
        interval: options.interval || 2000,
        random: options.random || false,
        id: options.id || "retrotype",
        typeSpeed: options.typeSpeed || 200,
        deleteSpeed: options.deleteSpeed || 100,
        initialTime: options.initialTime || options.interval
    };

    console.log(options);
    
    strings = new Cycle(strings);
    
    console.log(strings);
    
    var item = document.getElementById(options.id);

    console.log(item);
    
    item.innerHTML = strings.get();
    
    var curString = strings.get();
    var nextString = strings.get(1);
        
    var trueInterval = options.initialTime; //curString.length * options.deleteSpeed + nextString.length * options.typeSpeed + options.interval;
    var intervalIDs = {};
    var timeoutIDs = {};
        
    var execute = function() {
        
            curString = strings.get();
            nextString = strings.next();

            intervalIDs.delete = deleteString(curString, item, options.deleteSpeed);
            
            timeoutIDs.type = setTimeout(function() {
                intervalIDs.type = typeString(nextString, item, options.typeSpeed);
            }, curString.length * options.deleteSpeed);
            
            trueInterval = curString.length * options.deleteSpeed + nextString.length * options.typeSpeed + options.interval;
            
            clearInterval(intervalID);
            
            intervalID = setInterval(execute, trueInterval);
            intervalIDs.main = intervalID;            
    }
        
    var intervalID = setInterval(execute, trueInterval);
    
    window.onblur = function () {
        clearInterval(intervalID);
        clearIntervals(objToArray(intervalIDs));
        clearTimeouts(objToArray(timeoutIDs));
        item.innerHTML = strings.next();
    }
    
    window.onfocus = function () {
        intervalID = setInterval(execute, trueInterval/2);
    }
}