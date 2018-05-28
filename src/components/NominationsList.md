------
### Arguments:
+ **nominations**   array of string, where every string represent nomination.
+ **callback**  function, which add all changed (or added information) to one object. This object we will POST after clicking button 'ADD'.This function is called every time a field is changed.
+ **firstArg, secondArg** argument of functions. firstArg is string which represent type of image, which we sent. secondArg is array, which have data which we add or remove.

```js
<NominationsList nominations={["NOM1", "NOM2"]} callback={(firstArg, secondArg) => {return;}}/>
```