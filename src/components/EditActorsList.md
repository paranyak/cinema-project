------
### Arguments:
+ **actors**   array of objects, where each object represents information about Actor. For example, *{name: 'Actors Name', _id: "12345", movies: [list of all movies]}*
+ **callback**  function, which add all changed (or added information) to one object. This object we will POST after clicking button 'ADD'.This function is called every time a field is changed.
+ **firstArg, secondArg** argument of functions. firstArg is string which represent type of image, which we sent. secondArg is array, which have data which we add or remove.

```js
func = () => {};
const actors = [
    {name: 'A0', _id: "5af369c999de722ecc00f499", movies: []},
    {name: 'A1', _id: "5af369c999de722ecc00f49b", movies: []},
    {name: 'A2', _id: "5af369c999de722ecc00f49a", movies: []}
];

<EditActorsList actors={actors} callback={(firstArg, secondArg) => {return;}}/>
```