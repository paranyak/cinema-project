------
### Arguments:
+ **callback**    function, which add all changed (or added information) to one object. This object we will POST after clicking button 'ADD'.This function is called every time a field is changed.
+ **firstArg**   (type: string) string, which represent image type which we add. It can be: poster, screenshots, image.
+ **secondArg**  (type: array) array, which have all data from object which we add . For example, ['name': 'Viktor', 'city': 'Lviv'...]
```js
<AddActorImage callback={(firstArg, secondArg) => {return;}}/>
```


