
------
### Arguments:
+ **actorImg**   start value of Drag and Drop Image, for example, it can be url of image.
+ **callback**  function, which add all changed (or added information) to one object. This object we will POST after clicking button 'ADD'.This function is called every time a field is changed.
+ **firstArg, secondArg** argument of functions. firstArg is string which represent type of image, which we sent. secondArg is array, which have data which we add or remove.

```js
<EditActorImage actorImg={'Cinema Project/l0xmhdty783hiwvmdett'} callback={(firstArg, secondArg)=> console.log("ACTION")}/>
```