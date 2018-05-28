------
### Arguments:
+ **value**   start value of Drag and Drop, for example, it can be url of image. Basically it is empty ''.
+ **name**    (type: string) string , which represent type of image, which we sent. For example, *poster, actor.*
+ **callbackFromParent**  function, which add all changed (or added information) to one object. This object we will POST after clicking button 'ADD'.This function is called every time a field is changed.
+ **callbackInRemove**  function, which removes this item from object above, when we click on this object.
+ **firstArg, secondArg** argument of functions. firstArg is string which represent type of image, which we sent. secondArg is array, which have data which we add or remove.
```js
<DragDropImage value={''} name='poster' callbackFromParent={(firstArg, secondArg)=> console.log("ACTION")} callbackInRemove={(firstArg, secondArg)=> console.log("ACTION")}/>
```