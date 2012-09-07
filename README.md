Hashi is an small polyfill for the [hashchange event](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange).
It also works as an [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) module and can be installed from [jam](http://jamjs.org).

# Usage

```javascript
hashi.addListener(function(){
	alert("hash changed!");
})
```

# Usage with AMD (require.js)

```javascript
require(["hashi"], function(hashi){
  hashi.addListener(function(e){
    alert("changed from " + e.oldURL + " to " + e.newURL);
  })
});
```

## Remove listener

```javascript
function myListener(e){
alert("changed from " + e.oldURL + " to " + e.newURL);
}
hashi.removeListener(myListener);
```

Also you can remove all listener added with hashi:

```javascript
hashi.removeAllListeners();
```

# Install with JAM

```
jam install hashi
```

# License

MIT - José F. Romaniello 2012.