------
### Arguments:
+ **name**   string, which represents type of input we change. It can be *'scheduleTime'*.
+ **schedule** array, which includes all schedule time , for example,  ['12:00', ...].
+ **callback**  function, which add all changed (or added information) to one object. This object we will POST after clicking button 'ADD'.This function is called every time a field is changed.
+ **firstArg, secondArg** argument of functions. firstArg is string which represent type of image, which we sent. secondArg is array, which have data which we add or remove.

```js
func = () => {};
<TimeRanges name='scheduleTime' schedule={[]} callback={(firstArg, secondArg) => {return ;}}/>
```