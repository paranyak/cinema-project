------
### Arguments:
+ **film**  object, which have all information about movie. In this component we need only *image and screenshots* fields.
+ **callback**  function, which add all changed (or added information) to one object. This object we will POST after clicking button 'ADD'.This function is called every time a field is changed.
+ **firstArg, secondArg** argument of functions. firstArg is string which represent type of image, which we sent. secondArg is array, which have data which we add or remove.

```js
<EditMovieImage film={{"image": "Cinema Project/ymgt4tyhaqkhybywwkut", "screenshots": [
                                "Cinema Project/jp4qjm88k0x5kwejkfas",
                                 "Cinema Project/ccibyqtkshuevstojwbo"] }}
                                  callback={(firstArg, secondArg)=> console.log("ACTION")} />
```