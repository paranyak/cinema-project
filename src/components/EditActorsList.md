EditActorsList example:

```js
func = () => {};
const actors = [
    {name: 'A0', _id: "5af369c999de722ecc00f499", movies: []},
    {name: 'A1', _id: "5af369c999de722ecc00f49b", movies: []},
    {name: 'A2', _id: "5af369c999de722ecc00f49a", movies: []}
];

<EditActorsList actors={actors} callback={func}/>
```