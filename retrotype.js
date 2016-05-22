function deleteString(string, element, speed) {
    
    var arr = string.split("");
    
    var interval = setInterval(function() {
        
        arr.pop();
        element.innerHTML = arr.join("");
        
    }, speed);
    
    setTimeout(function() {
        clearInterval(interval);
    }, string.length * speed);
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
        deleteSpeed: options.deleteSpeed || 100
    };

    console.log(options);
    
    strings = new Cycle(strings);
    
    console.log(strings);
    
    var item = document.getElementById(options.id);

    console.log(item);
    
    item.innerHTML = strings.get();
    
    var curString = strings.get();
    var nextString = strings.get(1);
        
    var trueInterval = 0; //curString.length * options.deleteSpeed + nextString.length * options.typeSpeed + options.interval;
        
    var execute = function() {
        
            curString = strings.get();
            nextString = strings.next();

            console.log(curString, nextString);            

            deleteString(curString, item, options.deleteSpeed);
            
            setTimeout(function() {
                typeString(nextString, item, options.typeSpeed);
            }, curString.length * options.deleteSpeed);
            
            trueInterval = curString.length * options.deleteSpeed + nextString.length * options.typeSpeed + options.interval;
            
            clearInterval(interval);
            
            interval = setInterval(execute, trueInterval);
    }
        
    var interval = setInterval(execute, trueInterval);
}