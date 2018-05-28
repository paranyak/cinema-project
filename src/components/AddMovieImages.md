------
### Arguments:
+ **callback**    function, which add all changed (or added information) to one object. This object we will POST after clicking button 'ADD'.This function is called every time a field is changed.
+ **firstArg**   (type: array) array, which represent all types which we add, like all keys. It can be: [poster, screenshots,...].
+ **secondArg**  (type: array) array, which have all data from object which we add, like all values. For example, ['url1', 'url2',...]
```js
<AddMovieImages callback={(firstArg, secondArg) => {return;}}/>
```