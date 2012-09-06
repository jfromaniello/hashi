Hashi is an [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) module for the [hashchange event](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange) that works in any browser (polyfill).

# Install

```
jam install hashi
```

# Usage

```javascript
require(["hashi"], function(hashi){
  hashi.addListener(function(e){
    alert("changed from " + e.oldURL + " to " + e.newURL);
  })
});
```

## Remove listener

```javascript
require(["hashi"], function(hashi){
  function myListener(e){
    alert("changed from " + e.oldURL + " to " + e.newURL);
  }
  hashi.removeListener(myListener);
});
```

Also you can remove all listener added with hashi:

```javascript
  hashi.removeAllListeners();
```

# License

MIT - José F. Romaniello 2012.