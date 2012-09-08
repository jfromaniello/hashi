Hashi is an small polyfill for the [hashchange event](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange).
It also works as an [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) module and can be installed from [jam](http://jamjs.org).

# API

Add hashi.js or hashi.min.js to your html page. Then you can use as follows:

```javascript
function shout(){
  alert("hash changed!");
}
hashi.addListener(shout);
```

### Remove listener

```javascript
hashi.removeListener(shout);
```

### Remove all listeners

```javascript
hashi.removeAllListeners();
```

### Supports AMD (require.js)

```javascript
require(["hashi"], function(hashi){
  hashi.addListener(function(e){
    alert("changed from " + e.oldURL + " to " + e.newURL);
  })
});
```

# Install with JAM

```
jam install hashi
```

# License

MIT - José F. Romaniello 2012.