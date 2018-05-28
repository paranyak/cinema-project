------
### Arguments:
+ **defaultValue** array, which have default values of selection.
+ **options** array of all possible options, which can be in selection.
+ **name**   string, which represents type of selection. It can be *'genre'*
+ **callback**  function, which add all changed (or added information) to one object. This object we will POST after clicking button 'ADD'.This function is called every time a field is changed.
+ **firstArg, secondArg** argument of functions. firstArg is string which represent type of image, which we sent. secondArg is array, which have data which we add or remove.

```js
<EditSelections defaultValue={["A1", "A2","A3"]} options={["A4", "A5", "A6", "A1", "A2","A3"]} name={'genre'} callback={(firstArg, secondArg) => console.log("ACTION")}/>
```