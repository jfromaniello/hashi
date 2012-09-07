(function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof context['define'] == 'function' && context['define']['amd']) define(name, definition);
  else context[name] = definition();
})('hashi', this, function () {
  var cbCache = [],
      oldHashChange;

  function hasSupport(){ return "onhashchange" in window && !("_$onhashchange_ignore" in window); }

  //this will be used only if there is no window.addEventListener
  function onHashChange(v){
    if(oldHashChange) oldHashChange(v);
    for(var i in cbCache){
      cbCache[i](v);
    }
  }
      
  function addListener(callback){

    if (hasSupport()) {
      cbCache.push(callback);
      if(window.addEventListener){
        return window.addEventListener("hashchange", callback);
      }
      if(window.onhashchange !== onHashChange){
        oldHashChange = window.onhashchange;
        window.onhashchange = onHashChange;
      }
      return;
    }
    //we do polling.
    var location = window.location,
        oldURL = location.href,
        oldHash = location.hash;

    var interval = setInterval(function(){
      if(location.hash !== oldHash){
        callback({
          oldURL: oldURL,
          newURL: location.href
        });
      }
    }, 100);

    cbCache.push([callback, interval]);
  }

  function removeListener(callback){
    if (hasSupport()) {
      return window.addEventListener ?
              window.removeEventListener("hashchange", callback) :
              cbCache.splice(cbCache.indexOf(callback), 1);
    }

    //remove the polling interval
    for (var i = 0; i < cbCache.length; i++) {
      if (cbCache[i][0] === callback)
        return clearInterval(cbCache.splice(i, 1)[0][1]);
    }
  }

  function removeAllListeners(){
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