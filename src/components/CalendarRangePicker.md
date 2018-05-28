------
### Arguments:
+ **startDate**   data object in format ,for example, *{"year": 2018, "month": 10,"day": 21 }*.
+ **callback**    function, which add all changed (or added information) to one object. This object we will POST after clicking button 'ADD'.This function is called every time a field is changed.
+ **firstArg**  (type: string) string,which represent name of value which we add to object above. For example, *'scheduleDate'*.
+ **secondArg**  (type: array) array, which have  data from object (startDate) which we add.
```js
<CalendarRangePicker startDate={{"year": 2018, "month": 10,"day": 21 }} callbackFromParent={(firstArg, secondArg)=> {return;}}/>
```