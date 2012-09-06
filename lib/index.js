define(function(){
  var cbCache = [],
      oldHashChange;

  //this will be used only if there is no window.addEventListener
  function onHashChange(v){
    if(oldHashChange){
      oldHashChange(v);
    }
    for(var i in cbCache){
      if(cbCache[i]){
        cbCache[i](v);            
      }
    }
  }
      
  function addListener(callback){

    if ("onhashchange" in window && !("_$onhashchange_ignore" in window) //very ugly
       ) {
      if(window.addEventListener){
        return window.addEventListener("hashchange", callback);
      }else{
        if(window.onhashchange !== onHashChange){
          oldHashChange = window.onhashchange;
          window.onhashchange = onHashChange;
        }
      }
      cbCache.push(callback);
    }else{
      var location = window.location,
          oldURL = location.href,
          oldHash = location.hash;

      var interval = setInterval(function(){
        var newURL = location.href,
          newHash = location.hash;
        if(newHash !== oldHash){
          callback({
            oldURL: oldURL,
            newURL: newURL
          });
        }
      }, 100);
      cbCache.push([callback, interval]);
    }
  }

  function removeListener(callback){
    var cb, interval;

    if ("onhashchange" in window  && !("_$onhashchange_ignore" in window) //very ugly
       ) {
      if(window.addEventListener){
        return window.removeEventListener("hashchange", callback);
      }
      cbCache.splice(cbCache.indexOf(callback), 1);
    }else{
      for (var i = 0; i < cbCache.length; i++) {
        cb = cbCache[i][0];
        interval = cbCache[i][1];
        if (cb === callback) {
          clearInterval(interval);
          cbCache.splice(i, 1);
          break;
        }
      }
    } 
  }

  function removeAllListeners(){
    if(cbCache.length === 0) return;
    var i, copy = cbCache.slice(0);
    for (i in copy) {
      removeListener(typeof(copy[i]) == "function" ? copy[i] : copy[i][0]);
    }
  }

  return {
    addListener: addListener,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners
  };
});